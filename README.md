#  PixelTrap — Gestión de Sesiones Fotográficas

**Isaac Fernández Pintor**


##  Instalación

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

##  Usuarios de prueba

| Email | Contraseña |
|---|---|
| `usuario@gmail.com` | `usuario` |
| `admin@gmail.com` | `admin` |

---

##  Variables de entorno

Crear un archivo `.env` (ya incluido) con:

```
VITE_API_URL=http://localhost:3000
```

---

##  Checklist de requisitos

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


