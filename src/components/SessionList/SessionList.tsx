import type { PhotoSession } from "../../types/Session";
import SessionCard from "../SessionCard/SessionCard";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import "./SessionList.css";

type SessionListProps = {
  sessions: PhotoSession[];
  loading: boolean;
  deletingId: number | null;
  onDelete: (session: PhotoSession) => void;
  onEdit: (session: PhotoSession) => void;
};

export default function SessionList({
  sessions,
  loading,
  deletingId,
  onDelete,
  onEdit,
}: SessionListProps) {
  if (loading) {
    return (
      <div className="session-list-container">
        <p>Cargando ....</p>
      </div>
    );
  }

  if (!sessions.length) {
    return (
      <div className="session-list-empty">
        <p>No hay sesiones disponibles.</p>
      </div>
    );
  }

  return (
    <div className="session-grid">
      {sessions.map((s) => (
        <SessionCard
          key={s.id}
          session={s}
          onDelete={onDelete}
          onEdit={onEdit}
          deleting={deletingId === s.id}
        />
      ))}
    </div>
  );
}
