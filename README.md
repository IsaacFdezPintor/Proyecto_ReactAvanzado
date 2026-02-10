# 📸 StudioSnap — Gestión de Sesiones Fotográficas

**Práctica Final — Entorno Cliente (React Avanzado)**

Aplicación SPA desarrollada con **React 19 + TypeScript** que consume una API REST para la gestión completa (CRUD) de sesiones fotográficas con autenticación JWT.

---

## 🚀 Tecnologías

| Tecnología | Versión | Uso |
|---|---|---|
| React | 19.2 | UI declarativa con hooks |
| TypeScript | 5.9 | Tipado estático |
| Vite | 7.x | Dev server y bundler |
| React Router | 7.x | Enrutamiento SPA |
| Axios | 1.x | Cliente HTTP |
| Express + json-server | — | Backend API REST |
| Docker | — | Contenedor del backend |

---

## 📦 Instalación

```bash
# 1. Clonar / descomprimir el proyecto
cd practica-final-sesiones

# 2. Instalar dependencias del frontend
npm install

# 3. Levantar el backend con Docker
docker compose up -d

# 4. Arrancar el frontend
npm run dev
```

El frontend estará en **http://localhost:5173** y el backend en **http://localhost:3000**.

---

## 🔐 Usuarios de prueba

| Email | Contraseña |
|---|---|
| `usuario@gmail.com` | `usuario` |
| `admin@gmail.com` | `admin` |

---

## 🌐 Variables de entorno

Crear un archivo `.env` (ya incluido) con:

```
VITE_API_URL=http://localhost:3000
```

---

## 📁 Estructura del proyecto

```
practica-final-sesiones/
├── backend/              # API REST (Express + json-server)
│   ├── server.js         # Servidor con auth JWT y CRUD
│   ├── db.json           # Base de datos JSON
│   └── Dockerfile
├── src/
│   ├── auth/             # Contexto de autenticación + storage
│   ├── components/       # Componentes reutilizables
│   │   └── ui/           # Componentes UI genéricos
│   ├── hooks/            # Custom hooks (useToast)
│   ├── layout/           # AppLayout con navbar + footer
│   ├── pages/            # 9 páginas de la aplicación
│   ├── routing/          # ProtectedRoute
│   ├── services/         # Servicios HTTP (auth, sessions)
│   └── types/            # Tipos TypeScript
├── index.html
├── package.json
├── vite.config.ts
└── docker-compose.yml
```

---

## 📋 Endpoints de la API

### Autenticación
| Método | Ruta | Descripción |
|---|---|---|
| POST | `/auth/login` | Iniciar sesión |
| POST | `/auth/register` | Crear cuenta |
| GET | `/auth/me` | Obtener usuario actual |

### Sesiones (requieren JWT)
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/sessions` | Listar sesiones del usuario |
| GET | `/sessions/:id` | Detalle de una sesión |
| POST | `/sessions` | Crear nueva sesión |
| PUT | `/sessions/:id` | Actualizar sesión completa |
| DELETE | `/sessions/:id` | Eliminar sesión |

---

## ✅ Checklist de requisitos

- [x] Aplicación SPA con React + TypeScript
- [x] Consumo de API REST con Axios
- [x] CRUD completo (crear, leer, actualizar, eliminar)
- [x] Autenticación JWT (login, registro, token en headers)
- [x] Rutas públicas (Home, Login, Registro)
- [x] Rutas privadas (Sesiones, Perfil)
- [x] Página 404 (ruta comodín `*`)
- [x] Context API para gestión de autenticación
- [x] Componentes reutilizables (Button, Input, Card, Modal, Toast, etc.)
- [x] Custom hooks (`useToast`)
- [x] Gestión de estados de carga (LoadingSpinner)
- [x] Gestión de errores (toasts de error, validaciones)
- [x] Modales de confirmación (eliminación)
- [x] Filtros y búsqueda
- [x] Diseño responsive
- [x] Navegación con React Router v7
- [x] Backend dockerizado

---

## 🎨 Tema visual

La aplicación usa una paleta **verde / turquesa (teal)** con variables CSS personalizadas.

---

## 📝 Scripts disponibles

```bash
npm run dev       # Servidor de desarrollo
npm run build     # Build de producción
npm run preview   # Preview del build
npm run lint      # Linting con ESLint
```
