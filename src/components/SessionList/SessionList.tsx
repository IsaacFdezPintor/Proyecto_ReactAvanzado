import type { PhotoSession } from "../../types/Session";
import SessionCard from "../SessionCard/SessionCard";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  // Mostramos spinner mientras carga
  if (loading) {
    return <LoadingSpinner message="Cargando sesiones..." />;
  }

  // Renderizamos la cuadrícula de tarjetas
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
