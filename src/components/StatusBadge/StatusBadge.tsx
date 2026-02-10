// =============================================
// StatusBadge.tsx — Insignia de estado con color
// =============================================

import type { SessionStatus } from "../../types/Session";
import './StatusBadge.css';

// Configuración de cada estado: texto y clase CSS
const STATUS_CONFIG: Record<SessionStatus, { label: string; className: string }> = {
  pendiente:   { label: "Pendiente",   className: "badge--pending" },    // Amarillo
  confirmada:  { label: "Confirmada",  className: "badge--confirmed" },  // Azul
  completada:  { label: "Completada",  className: "badge--completed" },  // Verde
  cancelada:   { label: "Cancelada",   className: "badge--cancelled" },  // Rojo
};

// Props del componente
type StatusBadgeProps = {
  status: SessionStatus;
};

export default function StatusBadge({status}: StatusBadgeProps) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.pendiente;

  return (
    <span className={`badge ${cfg.className}`}>
      {cfg.label}
    </span>
  );
}
