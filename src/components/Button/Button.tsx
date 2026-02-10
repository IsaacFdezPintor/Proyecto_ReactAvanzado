import './Button.css'; 

interface buttonProps {
  // El texto que aparecerá dentro del botón (obligatorio).
  texto: string;

  // La función que se ejecutará al hacer clic (obligatorio).
  onClick?: () => void;
  
  // El estilo o color predefinido: solo 'primary', 'danger' o 'secondary' (opcional).
  estilo?: 'verde' | 'rojo' | 'gris'; 
  
  // Si está deshabilitado o no (opcional).
  deshabilitar?: boolean;
}

export default function Button ({ texto, onClick, estilo = 'verde', deshabilitar }: buttonProps) {  
  return (
    <button 
      // Combina las clases CSS: 'custom-btn' (base) y la clase específica según el 'variant' (ej: 'btn-primary').
      className={`custom-btn btn-${estilo}`} 
      
      // Asigna la función 'onClick' recibida a la acción de hacer clic.
      onClick={onClick}
      
      // Asigna el estado 'disabled' al botón HTML.
      disabled ={deshabilitar}
    >
      {texto}
    </button>
  );
};