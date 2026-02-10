// =============================================
// ProfilePage.tsx — Página de perfil del usuario
// =============================================
// Muestra los datos del usuario logueado:
// avatar, nombre, email e ID.
// Los datos se obtienen del contexto de auth (no del servidor).
// Si no hay usuario (no debería pasar porque es ruta protegida),
// devuelve null (no renderiza nada).
// =============================================

// Hook para acceder a los datos del usuario autenticado
import { useAuth } from "../auth/authContext";

export default function ProfilePage() {
  // Extraemos el usuario del contexto
  const { user } = useAuth();

  // Seguridad: si no hay usuario, no renderizamos nada
  // (en teoría ProtectedRoute impide llegar aquí sin estar logueado)
  if (!user) return null;

  return (
    <div className="profile-page">
      <div className="profile-card">
        {/* Avatar simple con emoji */}
        <div className="profile-card__avatar">👤</div>
        {/* Nombre del usuario */}
        <h1 className="profile-card__name">{user.name}</h1>
        {/* Email del usuario */}
        <p className="profile-card__email">{user.email}</p>
        {/* Línea divisoria */}
        <div className="profile-card__divider" />
        {/* ID del usuario */}
        <div className="profile-card__info">
          <span className="profile-card__label">ID de usuario</span>
          <span className="profile-card__value">{user.id}</span>
        </div>
      </div>
    </div>
  );
}
