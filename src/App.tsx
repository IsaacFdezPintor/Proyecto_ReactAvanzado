// Routes y Route: componentes de React Router para definir rutas
import { Routes, Route } from "react-router-dom";
import "./App.css";
import AppLayout from "./layout/AppLayout";
import ProtectedRoute from "./routing/ProtectedRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SessionsPage from "./pages/SessionsPage";
import SessionDetailPage from "./pages/SessionDetailPage";
import SessionCreatePage from "./pages/SessionCreatePage";
import SessionEditPage from "./pages/SessionEditPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>

        {/* ---- RUTAS PÚBLICAS ---- */}
        <Route path="/" element={<HomePage />} /> {/* TODO Asignación de Pagina de Inicio */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ---- RUTAS PROTEGIDAS ---- */}
        <Route path="/sessions" element={<ProtectedRoute> <SessionsPage />  </ProtectedRoute>} />
        <Route path="/sessions/new" element={ <ProtectedRoute> <SessionCreatePage /> </ProtectedRoute>} />
        <Route path="/sessions/:id" element={ <ProtectedRoute> <SessionDetailPage /> </ProtectedRoute>} />
        <Route path="/sessions/:id/edit" element={<ProtectedRoute> <SessionEditPage /> </ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute> <ProfilePage /> </ProtectedRoute>} />

        {/* ---- RUTA 404 ---- */}
        {/* "*" captura cualquier URL que no coincida con las anteriores */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
