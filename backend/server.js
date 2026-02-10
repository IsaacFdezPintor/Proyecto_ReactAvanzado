// =============================================
// server.js — Backend (API REST) de StudioSnap
// =============================================
// Este archivo es el SERVIDOR de la aplicación.
// Se ejecuta con Node.js dentro de Docker y proporciona:
//
//   1. AUTENTICACIÓN (JWT + bcrypt):
//      - POST /auth/login    → Iniciar sesión
//      - POST /auth/register → Crear cuenta
//      - GET  /auth/me       → Obtener datos del usuario actual
//
//   2. CRUD DE SESIONES (protegido por JWT):
//      - GET    /sessions       → Obtener todas las sesiones del usuario
//      - GET    /sessions/:id   → Obtener una sesión por ID
//      - POST   /sessions       → Crear nueva sesión
//      - PUT    /sessions/:id   → Actualizar sesión completa
//      - PATCH  /sessions/:id   → Actualizar parcialmente
//      - DELETE /sessions/:id   → Eliminar sesión
//
// Tecnologías usadas:
//   - Express: framework web para Node.js
//   - json-server: base de datos JSON simple (db.json)
//   - JWT (jsonwebtoken): tokens de autenticación
//   - bcrypt: encriptación de contraseñas
//   - CORS: permite peticiones desde otros dominios (el frontend)
//
// Las sesiones están SCOPED al usuario: cada usuario solo
// puede ver/editar/borrar SUS propias sesiones.
// =============================================

// --- Importaciones ---
import express from "express";     // Framework web
import cors from "cors";           // Middleware para permitir peticiones cross-origin
import jwt from "jsonwebtoken";    // Crear y verificar tokens JWT
import bcrypt from "bcrypt";       // Encriptar y comparar contraseñas
import jsonServer from "json-server"; // Base de datos JSON simple

// Puerto del servidor (por defecto 3000)
const PORT = process.env.PORT ?? 3000;
// Clave secreta para firmar los JWT (en producción debería ser una clave segura)
const JWT_SECRET = process.env.JWT_SECRET ?? "dev-secret";

// Creamos la app de Express
const app = express();
// Habilitamos CORS para que el frontend (otro puerto) pueda hacer peticiones
app.use(cors());
// Habilitamos el parsing de JSON en el body de las peticiones
app.use(express.json());

// Creamos el router de json-server apuntando a db.json
const router = jsonServer.router("db.json");
// db nos da acceso directo a la base de datos (lectura/escritura)
const db = router.db;

// =============================================
// FUNCIONES AUXILIARES (helpers)
// =============================================

// signToken: genera un token JWT para un usuario.
// El token contiene el ID, email y nombre del usuario.
// Expira en 2 horas.
function signToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email, name: user.name }, // Payload (datos dentro del token)
    JWT_SECRET,      // Clave secreta para firmar
    { expiresIn: "2h" }  // Expiración
  );
}

// authRequired: MIDDLEWARE que protege las rutas.
// Un middleware es una función que se ejecuta ANTES del handler de la ruta.
// Comprueba que la petición lleva un token JWT válido.
// Si es válido → guarda los datos del usuario en req.user y llama a next()
// Si no → devuelve 401 (no autorizado)
function authRequired(req, res, next) {
  // Leemos la cabecera Authorization (ej: "Bearer eyJhbGci...")
  const header = req.headers.authorization;
  // Si no hay cabecera o no empieza por "Bearer ", error 401
  if (!header?.startsWith("Bearer "))
    return res.status(401).json({ message: "Token requerido" });

  // Extraemos el token (quitando "Bearer " del principio)
  const token = header.slice("Bearer ".length);
  try {
    // jwt.verify desencripta el token y devuelve el payload
    // Si el token ha expirado o la firma no coincide, lanza error
    req.user = jwt.verify(token, JWT_SECRET);
    next(); // Todo ok → pasamos al siguiente handler
  } catch {
    return res.status(401).json({ message: "Token inválido" });
  }
}

// userIdFromReq: extrae el ID del usuario del token (campo "sub")
const userIdFromReq = (req) => Number(req.user?.sub);

// sessionBelongsToUser: comprueba si una sesión pertenece a un usuario
// Esto evita que un usuario pueda ver/editar/borrar sesiones de otros
function sessionBelongsToUser(session, userId) {
  return session && Number(session.userId) === Number(userId);
}

// =============================================
// ENDPOINTS DE AUTENTICACIÓN
// =============================================

// POST /auth/login — Iniciar sesión
// Body esperado: { email, password }
// Respuesta: { token, user: { id, email, name } }
app.post("/auth/login", async (req, res) => {
  // Extraemos email y password del body de la petición
  const { email, password } = req.body ?? {};
  // Validación: ambos campos son obligatorios
  if (!email || !password)
    return res.status(400).json({ message: "Email y password son obligatorios" });

  // Buscamos el usuario en la base de datos por email
  const user = db.get("users").find({ email }).value();
  // Si no existe o no tiene contraseña hasheada, error 401
  if (!user?.passwordHash)
    return res.status(401).json({ message: "Credenciales inválidas" });

  // bcrypt.compare compara la contraseña en texto plano con el hash
  // Devuelve true si coinciden, false si no
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: "Credenciales inválidas" });

  // Generamos un token JWT para el usuario
  const token = signToken(user);
  // Devolvemos el token y los datos del usuario (SIN la contraseña)
  return res.json({
    token,
    user: { id: user.id, email: user.email, name: user.name },
  });
});

// POST /auth/register — Crear cuenta nueva
// Body esperado: { email, password, name }
// Respuesta: { id, email, name } (sin token, el frontend hace login después)
app.post("/auth/register", async (req, res) => {
  const { email, password, name } = req.body ?? {};
  // Validación: los 3 campos son obligatorios
  if (!email || !password || !name)
    return res.status(400).json({ message: "name, email y password son obligatorios" });

  // Comprobamos si ya existe un usuario con ese email
  const exists = db.get("users").find({ email }).value();
  if (exists) return res.status(409).json({ message: "Email ya registrado" });

  // Hasheamos la contraseña con bcrypt (10 rondas de salteo)
  // NUNCA se guarda la contraseña en texto plano
  const passwordHash = await bcrypt.hash(password, 10);

  // Generamos un ID único para el nuevo usuario
  const users = db.get("users");
  const nextId = (users.maxBy("id").value()?.id ?? 0) + 1;

  // Creamos el objeto del usuario y lo guardamos en db.json
  const newUser = { id: nextId, email, name, passwordHash };
  users.push(newUser).write(); // .write() persiste en el archivo JSON

  // Devolvemos los datos del usuario (código 201 = Created)
  return res
    .status(201)
    .json({ id: newUser.id, email: newUser.email, name: newUser.name });
});

// GET /auth/me — Obtener datos del usuario autenticado
// Requiere token JWT (middleware authRequired)
app.get("/auth/me", authRequired, (req, res) => {
  // Los datos del usuario están en req.user (puestos por authRequired)
  return res.json({
    id: req.user.sub,
    email: req.user.email,
    name: req.user.name,
  });
});

// =============================================
// ENDPOINTS CRUD DE SESIONES (protegidos)
// =============================================
// Todos los endpoints de sesiones usan authRequired como middleware.
// Esto significa que PRIMERO se verifica el token y DESPUÉS se ejecuta el handler.

// GET /sessions — Obtener todas las sesiones del usuario
app.get("/sessions", authRequired, (req, res) => {
  const userId = userIdFromReq(req);
  // Filtramos las sesiones por userId para que cada usuario solo vea las suyas
  const sessions = db.get("sessions").filter({ userId }).value();
  return res.json(sessions);
});

// GET /sessions/:id — Obtener una sesión por su ID
app.get("/sessions/:id", authRequired, (req, res) => {
  const userId = userIdFromReq(req);
  const id = Number(req.params.id); // :id de la URL

  const session = db.get("sessions").find({ id }).value();
  // Verificamos que la sesión existe Y pertenece al usuario
  if (!sessionBelongsToUser(session, userId))
    return res.status(404).json({ message: "Sesión no encontrada" });

  return res.json(session);
});

// POST /sessions — Crear nueva sesión
app.post("/sessions", authRequired, (req, res) => {
  const userId = userIdFromReq(req);
  // Extraemos todos los campos del body
  const { title, client, category, date, location, price, status, notes, coverUrl } =
    req.body ?? {};

  // Validaciones: título y cliente son obligatorios
  if (!title?.trim())
    return res.status(400).json({ message: "El título es obligatorio" });
  if (!client?.trim())
    return res.status(400).json({ message: "El cliente es obligatorio" });

  // Generamos ID único
  const sessions = db.get("sessions");
  const nextId = (sessions.maxBy("id").value()?.id ?? 0) + 1;

  // Creamos el objeto de la nueva sesión con valores por defecto
  const newSession = {
    id: nextId,
    title: title.trim(),
    client: client.trim(),
    category: category?.trim() || "Retrato",        // Por defecto "Retrato"
    date: date || new Date().toISOString().split("T")[0], // Por defecto hoy
    location: location?.trim() || "",
    price: Math.max(0, Number(price) || 0),          // Mínimo 0
    status: status?.trim() || "pendiente",            // Por defecto "pendiente"
    notes: notes?.trim() || "",
    coverUrl: coverUrl?.trim() || "",
    userId,  // Asociamos la sesión al usuario autenticado
  };

  // Guardamos en la base de datos
  sessions.push(newSession).write();
  return res.status(201).json(newSession); // 201 = Created
});

// PUT /sessions/:id — Actualizar sesión completa
// Se reemplazan TODOS los campos (excepto id y userId)
app.put("/sessions/:id", authRequired, (req, res) => {
  const userId = userIdFromReq(req);
  const id = Number(req.params.id);

  const session = db.get("sessions").find({ id }).value();
  if (!sessionBelongsToUser(session, userId))
    return res.status(404).json({ message: "Sesión no encontrada" });

  const { title, client, category, date, location, price, status, notes, coverUrl } =
    req.body ?? {};
  if (!title?.trim())
    return res.status(400).json({ message: "El título es obligatorio" });

  // ...session esparce los datos originales, y los nuevos los sobreescriben
  const updated = {
    ...session,
    title: title.trim(),
    client: client?.trim() || session.client,
    category: category?.trim() || session.category,
    date: date || session.date,
    location: location?.trim() ?? session.location,
    price: Math.max(0, Number(price) ?? session.price),
    status: status?.trim() || session.status,
    notes: notes?.trim() ?? session.notes,
    coverUrl: coverUrl?.trim() ?? session.coverUrl,
    userId, // Mantenemos el userId del usuario autenticado
  };

  // .assign() actualiza el registro y .write() persiste en db.json
  db.get("sessions").find({ id }).assign(updated).write();
  return res.json(updated);
});

// PATCH /sessions/:id — Actualización parcial
// Solo actualiza los campos que se envíen en el body
app.patch("/sessions/:id", authRequired, (req, res) => {
  const userId = userIdFromReq(req);
  const id = Number(req.params.id);

  const session = db.get("sessions").find({ id }).value();
  if (!sessionBelongsToUser(session, userId))
    return res.status(404).json({ message: "Sesión no encontrada" });

  // Construimos un objeto "patch" solo con los campos que vienen en el body
  const patch = {};
  if (req.body?.title !== undefined) {
    const t = String(req.body.title).trim();
    if (!t) return res.status(400).json({ message: "El título no puede estar vacío" });
    patch.title = t;
  }
  if (req.body?.client !== undefined) patch.client = String(req.body.client).trim();
  if (req.body?.category !== undefined) patch.category = String(req.body.category).trim();
  if (req.body?.date !== undefined) patch.date = String(req.body.date);
  if (req.body?.location !== undefined) patch.location = String(req.body.location).trim();
  if (req.body?.price !== undefined) patch.price = Math.max(0, Number(req.body.price));
  if (req.body?.status !== undefined) patch.status = String(req.body.status).trim();
  if (req.body?.notes !== undefined) patch.notes = String(req.body.notes).trim();
  if (req.body?.coverUrl !== undefined) patch.coverUrl = String(req.body.coverUrl).trim();

  // Solo actualizamos los campos del patch
  const updated = db.get("sessions").find({ id }).assign(patch).write();
  return res.json(updated);
});

// DELETE /sessions/:id — Eliminar sesión
app.delete("/sessions/:id", authRequired, (req, res) => {
  const userId = userIdFromReq(req);
  const id = Number(req.params.id);

  const session = db.get("sessions").find({ id }).value();
  if (!sessionBelongsToUser(session, userId))
    return res.status(404).json({ message: "Sesión no encontrada" });

  // .remove() elimina el registro y .write() persiste
  db.get("sessions").remove({ id }).write();
  return res.status(204).send(); // 204 = No Content (eliminado con éxito)
});

// =============================================
// CONFIGURACIÓN FINAL
// =============================================

// Middlewares por defecto de json-server (logging, servir archivos estáticos, etc.)
const middlewares = jsonServer.defaults();
app.use(middlewares);
// Router de json-server (maneja rutas no personalizadas)
app.use(router);

// Iniciamos el servidor en el puerto configurado
app.listen(PORT, () => {
  console.log(`StudioSnap API listening on http://localhost:${PORT}`);
});
