// =============================================
// LoadingSpinner.tsx — Componente de carga
// =============================================
import './LoadingSpinner.css';

type LoadingSpinnerProps = {
  message?: string; // Mensaje opcional que se muestra debajo del spinner
};

const LoadingSpinner = ({ message = "Cargando..." }: LoadingSpinnerProps) => {
  return (
    <div className="spinner">
      <div className="loader" />
      <p className="spinner-message">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
