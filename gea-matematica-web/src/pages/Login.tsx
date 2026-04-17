import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import { useGEAStore } from '../store/useGEAStore';
import { cn } from '../lib/utils';

export default function Login() {
  const navigate = useNavigate();
  const login = useGEAStore((s) => s.login);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);
    try {
      const ok = await login(email, senha);
      if (ok) {
        navigate('/');
      } else {
        setErro('E-mail ou senha incorretos. Tente: professor@seed.ap.gov.br / gea2024');
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo e título */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-lg mb-4 overflow-hidden">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663319298144/ViXMJTCDCXMX73ShCryogu/gea-web-icon-TorPsFxpspFEAhj7vMTNLd.webp"
              alt="GEA Matemática"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold text-white">GEA Matemática</h1>
          <p className="text-primary-200 mt-1 text-sm">
            Guia de Ensino e Aprendizagem — Ensino Médio
          </p>
          <p className="text-primary-300 text-xs mt-1">
            Secretaria de Estado da Educação do Amapá
          </p>
        </div>

        {/* Card de login */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Entrar na plataforma</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-mail institucional
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="professor@seed.ap.gov.br"
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
              <div className="relative">
                <input
                  type={mostrarSenha ? 'text' : 'password'}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className={cn('input-field pr-10')}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {mostrarSenha ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {erro && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
                {erro}
              </div>
            )}

            <button
              type="submit"
              disabled={carregando}
              className="btn-primary w-full justify-center py-3 text-base"
            >
              {carregando ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Entrando...
                </span>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Entrar
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              Acesso demo: <span className="font-mono text-primary-700">professor@seed.ap.gov.br</span> / <span className="font-mono text-primary-700">gea2024</span>
            </p>
          </div>
        </div>

        <p className="text-center text-primary-300 text-xs mt-6">
          © {new Date().getFullYear()} SEED-AP — Todos os direitos reservados
        </p>
      </div>
    </div>
  );
}
