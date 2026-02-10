import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/authContext";
import { AuthService } from "../services/authService";
import { isAxiosError } from "axios";
import Button from "../components/Button/Button";

const authService = AuthService;

export default function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Completa todos los campos");
      return;
    }
    if (password !== confirm) {
      setError("Las contraseñas no coinciden");
      return;
    }
    if (password.length < 4) {
      setError("La contraseña debe tener al menos 4 caracteres");
      return;
    }

    setLoading(true);
    try {
      const res = await authService.register(email, password, name);
      login({ token: res.token, user: res.user });
      navigate("/sessions");
    } catch (err) {
      if (isAxiosError(err) && err.response?.status === 409) {
        setError("Ya existe una cuenta con ese email");
      } else {
        setError("Error de conexión. Inténtalo más tarde.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form
        className="auth-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <h2 className="auth-form__title">Crear cuenta</h2>
        <p className="auth-form__subtitle">
          Únete a StudioSnap y gestiona tus sesiones
        </p>

        {error && <p className="auth-form__error">{error}</p>}

        {/* Input Nombre */}
        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          type="text"
          placeholder="Tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* Input Email */}
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Input Contraseña */}
        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          placeholder="Mínimo 4 caracteres"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Input Confirmar Contraseña */}
        <label htmlFor="confirm">Confirmar contraseña</label>
        <input
          id="confirm"
          type="password"
          placeholder="Repite la contraseña"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />

        {/* Botón Submit */}
        <Button
          texto={loading ? "Creando..." : "Crear cuenta"}
          onClick={handleSubmit}
          estilo="verde"
          deshabilitar={loading}
        />

        <p className="auth-form__footer">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </form>
    </div>
  );
}
