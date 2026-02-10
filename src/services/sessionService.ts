import type { PhotoSession } from "../types/Session";
import { http } from "./http";

// Leemos la URL base de la API desde las variables de entorno (.env)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string | undefined;

// Comprobación de seguridad: si la variable no está definida,
// lanzamos un error claro en vez de dejar que la app falle silenciosamente.
if (API_BASE_URL === undefined) {
  throw new Error("No está definida la URL de la API");
}

const API_URL = API_BASE_URL +"/sessions";

// Exportamos un objeto con los 5 métodos CRUD
export const sessionService = {

   // get(id) — Obtiene UNA sesión por su ID.
get(id: number): Promise<PhotoSession> {
  return http.get<PhotoSession>(API_URL + "/" + id).then(response => response.data);
},

  // getAll() — Obtiene TODAS las sesiones del usuario autenticado.
  getAll(): Promise<PhotoSession[]> {
        return http.get<PhotoSession[]>(API_URL).then(response => response.data);
  },

   // delete(id) — Elimina una sesión por su ID.
  delete(id: number): Promise<void> {
        return http.delete<void>(API_URL + "/" + id).then(() => {})
  },

// create(data) — Crea una nueva sesión fotográfica.
create(data: { title: string; completed?: boolean }): Promise<PhotoSession> {
  return http.post<PhotoSession>(API_URL, data).then(response => response.data);
},

  // update(session) — Actualiza una sesión existente.
  update(session: PhotoSession): Promise<PhotoSession> {
    // PUT /sessions/42 con los datos actualizados en el body
        return http.patch<PhotoSession>((API_URL + "/" + session.id),session).then(response => response.data)
  },
};
