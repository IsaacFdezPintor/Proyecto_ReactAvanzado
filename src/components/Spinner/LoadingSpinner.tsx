import './LoadingSpinner.css';

const LoadingSpinner = ({ message = "Cargando sesiones..." }) => {
  return (
    <div className="spinner">
      <div className="loader"></div>
      <p className="spinner-message">{message}</p>
    </div>
  );
};

export default LoadingSpinner;