import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, User, Plus, List } from 'lucide-react';
import { useGEAStore } from '../store/useGEAStore';

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useGEAStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/', label: 'Meus GEAs', icon: List },
    { path: '/gea/novo', label: 'Novo GEA', icon: Plus },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <header className="bg-primary-800 text-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-3 hover:opacity-90 transition-opacity"
            >
              <div className="rounded-lg overflow-hidden w-9 h-9 flex-shrink-0">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663319298144/ViXMJTCDCXMX73ShCryogu/gea-web-icon-TorPsFxpspFEAhj7vMTNLd.webp"
                  alt="GEA Matemática"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-base leading-tight">GEA Matemática</div>
                <div className="text-primary-200 text-xs leading-tight">SEED-AP · Ensino Médio</div>
              </div>
            </button>

            {/* Nav links */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map(({ path, label, icon: Icon }) => (
                <button
                  key={path}
                  onClick={() => navigate(path)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === path
                      ? 'bg-white/20 text-white'
                      : 'text-primary-100 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </nav>

            {/* User menu */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-sm text-primary-100">
                <User className="w-4 h-4" />
                <span className="max-w-[140px] truncate">{user?.nome}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-primary-100 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg text-sm transition-colors"
                title="Sair"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile nav */}
        <div className="md:hidden border-t border-primary-700 px-4 py-2 flex gap-2">
          {navItems.map(({ path, label, icon: Icon }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                location.pathname === path
                  ? 'bg-white/20 text-white'
                  : 'text-primary-100 hover:bg-white/10'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>
      </header>

      {/* Conteúdo */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-3 text-center text-xs text-gray-400">
        GEA Matemática · Secretaria de Estado da Educação do Amapá · {new Date().getFullYear()}
      </footer>
    </div>
  );
}
