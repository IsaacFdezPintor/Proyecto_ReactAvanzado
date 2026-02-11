import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/authContext";
import Button from "../components/Button/Button";
import { useEffect } from "react";

export default function AppLayout() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  useEffect(() => {
    document.title = "PixelTrap — Gestión de Sesiones";
  }, []);

  return (
    <div className="app-layout">
      <header className="navbar">
        <div className="navbar__inner">
          <NavLink to="/" className="navbar__brand"> PixelTrap </NavLink>

          <nav className="navbar__links">
            <NavLink to="/" end className="navbar__link">
              Inicio
            </NavLink>

            {isAuthenticated && (
              <NavLink to="/sessions" className="navbar__link">
                Sesiones
              </NavLink>
            )}
          </nav>

          <div className="navbar__actions">
            {isAuthenticated ? (
              <>
                <NavLink to="/profile" className="navbar__link navbar__link--user">
                  👤 {user?.name}
                </NavLink>
                <Button texto="Cerrar sesión" onClick={handleLogout} estilo="gris" />
              </>
            ) : (
              <>
                <NavLink to="/login" className="navbar__link">
                  Iniciar sesión
                </NavLink>
                <NavLink to="/register">
                  <Button texto="Registro" onClick={() => {}} estilo="verde" />
                </NavLink>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} PixelTrap — Gestión de Sesiones Fotográficas</p>
      </footer>
    </div>
  );
}