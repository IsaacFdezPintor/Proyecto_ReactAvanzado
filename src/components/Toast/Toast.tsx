import { useEffect } from "react";
import './Toast.css';

// Tipos
export type ToastType = "success" | "error" | "info";
export type ToastMessage = { id: number; text: string; type: ToastType };

interface ToastContainerProps {
  toasts: ToastMessage[];
  removeToast: (id: number) => void;
}

// Componente contenedor de toasts
export function ToastContainer({ toasts, removeToast }: ToastContainerProps) {
  return (
    <div className="toast-stack">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onClose={() => removeToast(t.id)} />
      ))}
    </div>
  );
}

// Componente individual de Toast
function ToastItem({ toast, onClose }: { toast: ToastMessage; onClose: () => void }) {
  useEffect(() => {
    // Definimos la duración: 
    // 6000ms si es éxito, 3000ms para el resto
    const duration = toast.type === "success" ? 6000 : 3000;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons: Record<ToastType, string> = { success: "✅", error: "❌", info: "ℹ️" };

  return (
    <div className={`toast toast--${toast.type}`} onClick={onClose}>
      <span className="toast-icon">{icons[toast.type]}</span>
      <span className="toast-text">{toast.text}</span>
    </div>
  );
}
