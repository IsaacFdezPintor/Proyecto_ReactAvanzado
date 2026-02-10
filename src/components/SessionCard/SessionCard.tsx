// =============================================
// SessionCard.tsx — Tarjeta de una sesión fotográfica
// =============================================

import { useNavigate } from "react-router-dom";
import type { PhotoSession } from "../../types/Session";
import StatusBadge from "../StatusBadge/StatusBadge";
import Button from "../Button/Button";

type SessionCardProps = {
  session: PhotoSession;
  onDelete: (session: PhotoSession) => void;
  onEdit: (session: PhotoSession) => void;
  deleting?: boolean;
};

// ---- Funciones auxiliares ----
function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function formatPrice(price: number): string {
  return price.toLocaleString("es-ES", { style: "currency", currency: "EUR" });
}

// ---- Componente principal ----
export default function SessionCard({
  session,
  onDelete,
  onEdit,
}: SessionCardProps) {
  const navigate = useNavigate();

  return (
    <div className="scard">
      {/* Insignia de estado */}
      <div className="scard-header">
        <StatusBadge status={session.status} />
      </div>

      {/* Cuerpo de la tarjeta */}
      <div className="scard-body">
        <h3
          className="scard-title"
          onClick={() => navigate(`/sessions/${session.id}`)}
        >
          {session.title}
        </h3>

        <p className="scard-client"> {session.client}</p>

        <div className="scard-meta">
          <span className="category-tag">{session.category}</span>
          <span className="scard-date"> {formatDate(session.date)}</span>
        </div>

        {session.location && (
          <p className="scard-location"> {session.location}</p>
        )}

        <div className="scard-footer">
          <span className="scard-price">{formatPrice(session.price)}</span>
          <div className="scard-actions">
            <Button texto="ver" onClick={() => navigate(`/sessions/${session.id}`)} estilo="verde" />
            <Button texto="editar" onClick={() => onEdit(session)} estilo="gris" />
            <Button texto="eliminar" onClick={() => onDelete(session)} estilo="rojo"/>
          </div>
        </div>
      </div>
    </div>
  );
}
