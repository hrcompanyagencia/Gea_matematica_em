import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Home from './pages/Home';
import NovoGEA from './pages/NovoGEA';
import SelecionarHabilidades from './pages/SelecionarHabilidades';
import GerarGEA from './pages/GerarGEA';
import EditorGEA from './pages/EditorGEA';
import PreviewGEA from './pages/PreviewGEA';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota pública */}
        <Route path="/login" element={<Login />} />

        {/* Rotas protegidas */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="gea/novo" element={<NovoGEA />} />
          <Route path="gea/habilidades/:id" element={<SelecionarHabilidades />} />
          <Route path="gea/gerar/:id" element={<GerarGEA />} />
          <Route path="gea/editor/:id" element={<EditorGEA />} />
          <Route path="gea/preview/:id" element={<PreviewGEA />} />
        </Route>

        {/* Redirecionar rotas desconhecidas */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
