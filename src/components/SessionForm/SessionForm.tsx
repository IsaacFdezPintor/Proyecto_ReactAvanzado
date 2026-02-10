import { useState } from "react";
import type { PhotoSession, SessionStatus } from "../../types/Session";
import Button from "../Button/Button"; 
import "./SessionForm.css";

type SessionFormProps = {
  addSession: (data: any ) => void;
  updateSession: (session: PhotoSession) => void;
  cancelUpdateSession: () => void;
  peticionEnProgreso: boolean;
  sessionSeleccionada: PhotoSession | null;
};

const CATEGORIES = [
  "Retrato", "Boda", "Producto", "Paisaje",
  "Evento", "Familia", "Moda", "Gastronomía",
  "Inmobiliaria", "Otro",
];

const STATUS_OPTIONS: { value: SessionStatus; label: string }[] = [
  { value: "pendiente", label: "Pendiente" },
  { value: "confirmada", label: "Confirmada" },
  { value: "completada", label: "Completada" },
  { value: "cancelada", label: "Cancelada" },
];

export default function SessionForm({
  addSession,
  peticionEnProgreso,
  sessionSeleccionada,
  updateSession,
  cancelUpdateSession,
}: SessionFormProps) {
  const [title, setTitle] = useState(sessionSeleccionada?.title ?? "");
  const [client, setClient] = useState(sessionSeleccionada?.client ?? "");
  const [category, setCategory] = useState(sessionSeleccionada?.category ?? CATEGORIES[0]);
  const [date, setDate] = useState(sessionSeleccionada?.date ?? "");
  const [location, setLocation] = useState(sessionSeleccionada?.location ?? "");
  const [price, setPrice] = useState(sessionSeleccionada?.price ?? 0);
  const [status, setStatus] = useState<SessionStatus>(sessionSeleccionada?.status ?? "pendiente");
  const [notes, setNotes] = useState(sessionSeleccionada?.notes ?? "");

  function handleSubmit() {
  if (title.trim().length > 0) {
    if (sessionSeleccionada != null) {
      const nuevaSesion: PhotoSession = {
        ...sessionSeleccionada,
        title,
        client,
        category,
        date,
        location,
        price,
        status,
        notes,
      };
      updateSession(nuevaSesion);
    } else {
      // Envía el objeto completo, no solo el título
      const nuevaSesion = {
        title: title.trim(),
        client,
        category,
        date,
        location,
        price,
        status,
        notes,
      };
      addSession(nuevaSesion);
      setTitle("");
    }
  }
}

  return (
    <form
      className="session-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className="form-grid">
        <input
          type="text"
          placeholder="Ej: Boda García-López"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoComplete="off"
        />

        <input
          type="text"
          placeholder="Ej: María García"
          value={client}
          onChange={(e) => setClient(e.target.value)}
          autoComplete="off"
        />

        <label>
          Categoría
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          autoComplete="off"
        />

        <input
          type="text"
          placeholder="Ubicación"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          autoComplete="off"
        />

        <input
          type="number"
          placeholder="Precio (€)"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          autoComplete="off"
        />

        <label>
          Estado
          <select value={status} onChange={(e) => setStatus(e.target.value as SessionStatus)}>
            {STATUS_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </label>
      </div>

      <label>
        Notas
        <textarea
          rows={4}
          placeholder="Detalles adicionales sobre la sesión..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </label>

      <div className="form-actions">
        {/* Botón de Guardar / Crear sesión */}
        <Button
          texto={sessionSeleccionada ? "Guardar cambios" : "Crear sesión"}
          onClick={handleSubmit}
          estilo="verde"
          deshabilitar={peticionEnProgreso}
        />

        {/* Botón Cancelar */}
        <Button
          texto="Cancelar"
          onClick={cancelUpdateSession}
          estilo="gris"
          deshabilitar={peticionEnProgreso}
        />
      </div>
    </form>
  );
}
