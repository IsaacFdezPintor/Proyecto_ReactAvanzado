// Importamos una herramienta de React para guardar datos 
import { useState } from "react";

// Importamos cosas relacionadas con el login del usuario
import { useAuth } from "../auth/authContext";

// Importamos herramientas para cambiar de página
import { Navigate, useNavigate } from "react-router-dom";

// Importamos el servicio que habla con la API para hacer login
import { AuthService } from "../services/authService";

import Button from "../components/Button/Button";

export default function LoginPage() {

    // Aquí sabemos si el usuario ya inició sesión
    // y tenemos una función para guardar el login
    const { isAuthenticated, login } = useAuth();

    // Guardamos lo que el usuario escribe en el email y contraseña
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Sirve para saber si algo está cargando (esperando respuesta)
    const [loading, setLoading] = useState(false);

    // Aquí guardamos un mensaje de error si algo sale mal
    const [error, setError] = useState<string | null>(null);

    // Esto sirve para cambiar de página con código
    const navigate = useNavigate();

    // Si el usuario YA está logueado, lo mandamos a la página de sesiones
    if (isAuthenticated) {
      return <Navigate to="/sessions" replace />
    }

      // Esta función se ejecuta cuando el usuario hace clic en el botón
      async function handleSubmit() {
        // Borramos errores anteriores
        setError(null);

      // Activamos el estado de carga
      setLoading(true);

      try {
        // TODO Página pública de login para obtener el JWT.
        const session = await AuthService.login(
          email.trim(), // quitamos espacios del email
          password
        );

        // Guardamos la sesión del usuario
        login(session);

        // Mandamos al usuario a la página de sesiones
        navigate("/sessions", { replace: true });

      } catch {
        // Si algo falla, mostramos un mensaje de error
        setError("Datos incorrectos o API no disponible");
      } finally {
        // Quitamos el estado de carga
        setLoading(false);
      }
    }

    // Esto es lo que se ve en pantalla
    return (
      <div className="auth-page">

        {/* Formulario de inicio de sesión */}
          <form
            className="auth-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >

          <h2>Iniciar sesión</h2>
          <p>Accede a tu cuenta de StudioSnap</p>
        <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />

            <Button
              texto={loading ? "Cargando..." : "Entrar"}
              onClick={handleSubmit} 
              estilo="verde"
              deshabilitar={loading}
            />

          {error && <div>{error}</div>}

        </form>
      </div>
    );
}
