import { Link } from "react-router-dom";
import Button from "../components/Button/Button";

/* TODO Página 404 para rutas inexistentes.*/

export default function NotFoundPage() {
  return (
    <div className="not-found-page">
      <h1 className="not-found-page__code">404</h1>
      <h2 className="not-found-page__title">Página no encontrada</h2>
      <p className="not-found-page__text">
        La página que buscas no existe o ha sido movida.
      </p>
      <Link to="/">
        <Button texto="Volver al inicio" onClick={() => {}} estilo="verde" />
      </Link>
    </div>
  );
}
