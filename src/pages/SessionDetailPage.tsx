import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { sessionService } from "../services/sessionService";
import type { PhotoSession } from "../types/Session";
import StatusBadge from "../components/StatusBadge/StatusBadge";
import Button from "../components/Button/Button";
import { ToastContainer } from "../components/Toast/Toast";
import { useToast } from "../components/Toast/useToast";

export default function SessionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [session, setSession] = useState<PhotoSession | null>(null);
  const { toasts, addToast, removeToast } = useToast();

  // TODO Consulta de detalles de un elemento (GET).
  useEffect(() => {
    if (!id) return;
    sessionService.get(Number(id))
      .then(setSession)
      .catch(() => addToast("Sesión no encontrada", "error"))
  }, [id]);


  if (!session) {
    return (
      <div className="session-detail session-detail--empty">
        <h2>Sesión no encontrada</h2>
        <Link to="/sessions">
          <Button texto="Volver" onClick={() => {}} estilo="gris" />
        </Link>
      </div>
    );
  }

  return (
    <div className="session-detail">
      <Link to="/sessions" className="session-detail__back">← Volver a sesiones</Link>

      <div className="session-detail__header">
        <div>
          <h1 className="session-detail__title">{session.title}</h1>
          <StatusBadge status={session.status} />
        </div>
      </div>

      <div className="session-detail__body">
        <div className="session-detail__info">
          <div className="info-row">
            <span className="info-row__label">Cliente</span>
            <span className="info-row__value">{session.client}</span>
          </div>
          <div className="info-row">
            <span className="info-row__label">Categoría</span>
            <span className="info-row__value">{session.category}</span>
          </div>
          <div className="info-row">
            <span className="info-row__label"> Fecha</span>
            <span className="info-row__value">{session.date}</span>
          </div>
          {session.location && (
            <div className="info-row">
              <span className="info-row__label"> Ubicación</span>
              <span className="info-row__value">{session.location}</span>
            </div>
          )}
          <div className="info-row">
            <span className="info-row__label"> Precio</span>
            <span className="info-row__value info-row__value--price">
              {session.price} €
            </span>
          </div>
          {session.notes && (
            <div className="info-row info-row--notes">
              <span className="info-row__label">Notas</span>
              <p className="info-row__value">{session.notes}</p>
            </div>
          )}
        </div>
      </div>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}