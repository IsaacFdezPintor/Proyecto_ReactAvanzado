import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sessionService } from "../services/sessionService";
import type { PhotoSession } from "../types/Session";
import SessionList from "../components/SessionList/SessionList";
import ConfirmDelete from "../components/ConfirmDelete/ConfirmDelete";
import Button from "../components/Button/Button";
import { ToastContainer } from "../components/Toast/Toast";
import { useToast } from "../components/Toast/useToast";

export default function SessionsPage() {
  const navigate = useNavigate();

  const [sessions, setSessions] = useState<PhotoSession[]>([]);
  const [loading, setLoading] = useState(true);

  const [deleteTarget, setDeleteTarget] = useState<PhotoSession | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const { toasts, addToast, removeToast } = useToast();

  useEffect(() => {
    loadSessions();
  }, []);

const loadSessions = async () => {
  setLoading(true);
  try {
    await new Promise((res) => setTimeout(res, 2000)); // 👈 simula 2s
    const data = await sessionService.getAll();
    setSessions(data);
  } catch {
    addToast("Error al cargar las sesiones", "error");
  } finally {
    setLoading(false);
  }
};


  const handleDeleteClick = (session: PhotoSession) => {
    setDeleteTarget(session);
  };

  const handleEdit = (session: PhotoSession) => {
    navigate(`/sessions/${session.id}/edit`);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    setDeletingId(deleteTarget.id);
    try {
      await sessionService.delete(deleteTarget.id);
      setSessions((prev) => prev.filter((s) => s.id !== deleteTarget.id));
      addToast(`Sesión «${deleteTarget.title}» eliminada`, "success");
      setDeleteTarget(null);
    } catch {
      addToast("Error al eliminar la sesión", "error");
    } finally {
      setDeleting(false);
      setDeletingId(null);
    }
  };

  return (
    <div className="sessions-page">
      <div className="sessions-page__header">
        <h1>Mis Sesiones</h1>
        <Link to="/sessions/new">
          <Button texto="+ Nueva sesión" estilo="verde" />
        </Link>
      </div>

     <SessionList
        sessions={sessions}
        loading={loading}
        deletingId={deletingId}
        onDelete={handleDeleteClick}
        onEdit={handleEdit}
      />

      {deleteTarget && (
        <div className="modal-overlay" onClick={() => setDeleteTarget(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Confirmar eliminación</h2>
              <button className="modal-close" onClick={() => setDeleteTarget(null)}>✕</button>
            </div>
            <div className="modal-body">
              <ConfirmDelete
                title={deleteTarget.title}
                loading={deleting}
                onConfirm={handleDeleteConfirm}
                onCancel={() => setDeleteTarget(null)}
              />
            </div>
          </div>
        </div>
      )}
      { /* Toast pasa los errores y removeToast le pasa la función para que cuando pulse a la X se cierre la notificación */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}