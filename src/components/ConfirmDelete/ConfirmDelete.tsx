// =============================================
// ConfirmDelete.tsx — Contenido del modal de confirmación
// =============================================

import Button from "../Button/Button";
import './ConfirmDelete.css';

type ConfirmDeleteProps = {
  title: string;              // Título de la sesión a eliminar
  loading: boolean;           // ¿Se está procesando la eliminación?
  onConfirm: () => void;      // Callback al confirmar
  onCancel: () => void;       // Callback al cancelar
};

export default function ConfirmDelete({
  title,
  loading,
  onConfirm,
  onCancel,
}: ConfirmDeleteProps) {
  return (
    <div className="confirm-delete">

      {/* Mensaje de advertencia */}
      <p className="confirm-delete__text">
        ¿Estás seguro de que quieres eliminar la sesión{" "}
        <strong>«{title}»</strong>? Esta acción no se puede deshacer.
      </p>

      {/* Botones de acción */}
      <div className="confirm-delete__actions">
        <Button texto="Cancelar" onClick={onCancel} estilo="gris" / >
        <Button texto="Eliminar" onClick={onConfirm} estilo="rojo" deshabilitar={loading}/>
      </div>
    </div>
  );
}
