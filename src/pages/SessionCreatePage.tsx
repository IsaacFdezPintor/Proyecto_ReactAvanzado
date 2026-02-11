import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sessionService } from "../services/sessionService";
import SessionForm from "../components/SessionForm/SessionForm";
import { ToastContainer } from "../components/Toast/Toast";
import { useToast } from "../components/Toast/useToast.tsx";

export default function SessionCreatePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { toasts, addToast, removeToast } = useToast();

  // TODO Alta de un nuevo elemento (POST).
  const handleSubmit = async (data: any) => {
    setLoading(true);
    try {
      // POST /sessions → crea la sesión en el servidor
      await sessionService.create(data);
      addToast("Sesión creada correctamente", "success");
      setTimeout(() => navigate("/sessions"), 400);
    } catch {
      addToast("Error al crear la sesión", "error"); //TODO Gestión visible de errores de la API. //TODO Son esas pequeñas notificaciones que aparecen en una esquina y desaparecen solas.
      setLoading(false);
    }
  };

  return (
    <div className="session-form-page">
      <h1>Nueva Sesión</h1>
    <SessionForm addSession={handleSubmit}  peticionEnProgreso={loading}  cancelUpdateSession={() => navigate("/sessions")} sessionSeleccionada={null}  updateSession={() => {}} />     
    <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}