import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/authContext";
import Button from "../components/Button/Button";

export default function HomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* ====== HERO: sección destacada ====== */}
      <section className="hero">
        <h1 className="hero__title">
          Gestiona tus <span className="hero__highlight">sesiones fotográficas</span> con facilidad
        </h1>
        <p className="hero__subtitle">
          Organiza, planifica y haz seguimiento de todas tus sesiones de
          fotografía desde un solo lugar. Clientes, presupuestos, estados y más.
        </p>

        {/* Botones de acción: cambian según estado de auth */}
        <div className="hero__actions">
          {user ? (
            <Button
              texto="Ver mis sesiones"
              onClick={() => navigate("/sessions")}
              estilo="verde"
            />
          ) : (
            <>
              <Button
                texto="Crear cuenta gratis"
                onClick={() => navigate("/register")}
                estilo="verde"
              />
              <Button
                texto="Iniciar sesión"
                onClick={() => navigate("/login")}
                estilo="gris"
              />
            </>
          )}
        </div>
      </section>

      {/* ====== FEATURES: tarjetas de características ====== */}
      <section className="features">
        <div className="feature-card">
          <h3 className="feature-card__title">Planificación</h3>
          <p className="feature-card__desc">
            Programa sesiones con fecha, ubicación y notas. Nunca pierdas un detalle.
          </p>
        </div>
        <div className="feature-card">
          <h3 className="feature-card__title">Gestión de clientes</h3>
          <p className="feature-card__desc">
            Asocia cada sesión a un cliente y mantén un registro ordenado.
          </p>
        </div>
        <div className="feature-card">
          <h3 className="feature-card__title">Control de precios</h3>
          <p className="feature-card__desc">
            Registra tarifas y lleva un seguimiento financiero de tus trabajos.
          </p>
        </div>
        <div className="feature-card">
          <h3 className="feature-card__title">Estados y seguimiento</h3>
          <p className="feature-card__desc">
            Marca sesiones como pendientes, confirmadas, completadas o canceladas.
          </p>
        </div>
      </section>
    </div>
  );
}
