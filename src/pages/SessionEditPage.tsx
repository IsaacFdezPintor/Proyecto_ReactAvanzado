import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { sessionService } from "../services/sessionService";
import type { PhotoSession } from "../types/Session";
import SessionForm from "../components/SessionForm/SessionForm";
import { ToastContainer } from "../components/Toast/Toast";
import { useToast } from "../components/Toast/useToast";

export default function SessionEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // ---- Estado ----
  const [session, setSession] = useState<PhotoSession | null>(null); // Datos cargados
  const [saving, setSaving] = useState(false);              // ¿Guardando cambios?
  const { toasts, addToast, removeToast } = useToast();

  // useEffect: cargar la sesión al montar el componente
  useEffect(() => {
    if (!id) return;
    // GET /sessions/:id → obtener datos actuales
    sessionService.get(Number(id))
      .then(setSession)
      .catch(() => addToast("Sesión no encontrada", "error"))
  }, [id]);

  // handleSubmit: se ejecuta al enviar el formulario de edición
  // TODO Edición de un elemento existente (PUT o PATCH).
  const handleSubmit = async (data: PhotoSession) => {
    if (!id) return;
    setSaving(true);
    try {
      // PUT /sessions/:id → actualiza la sesión en el servidor
      await sessionService.update(data);
      addToast("Sesión actualizada correctamente", "success");
      // Navegamos al detalle de la sesión después de 400ms
      setTimeout(() => navigate(`/sessions/${id}`), 400);
    } catch {
      addToast("Error al actualizar la sesión", "error");
      setSaving(false);
    }
  };

  // Si la sesión no existe (error al cargar)
  if (!session) {
    return (
      <div className="session-form-page">
        <h1>Sesión no encontrada</h1>
      </div>
    );
  }

  return (
    <div className="session-form-page">
      <h1>Editar Sesión</h1>
      {/* SessionForm CON initialData = modo edición (precarga los valores) */}
      <SessionForm sessionSeleccionada={session} updateSession={handleSubmit} peticionEnProgreso={saving} cancelUpdateSession={() => navigate(`/sessions/${id}`)} addSession={() => {}} 
      />
      {/* TODO Toasts */} //{/*Son esas pequeñas notificaciones que aparecen en una esquina y desaparecen solas.*/}
      <ToastContainer toasts={toasts} removeToast={removeToast} /> 
    </div>
  );
}
