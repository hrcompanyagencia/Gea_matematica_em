import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GEA } from '../types/gea';

interface User {
  email: string;
  nome: string;
}

interface GEAStore {
  // Auth
  user: User | null;
  login: (email: string, senha: string) => Promise<boolean>;
  logout: () => void;

  // GEAs
  geas: GEA[];
  geaAtual: GEA | null;
  setGeaAtual: (gea: GEA | null) => void;
  salvarGEA: (gea: GEA) => void;
  excluirGEA: (id: string) => void;
  getGEA: (id: string) => GEA | undefined;
}

// Usuários demo — em produção, substituir por autenticação real via API
const USUARIOS_DEMO = [
  { email: 'professor@seed.ap.gov.br', senha: 'gea2024', nome: 'Professor(a) Demo' },
  { email: 'admin@gea.ap.gov.br', senha: 'admin123', nome: 'Administrador' },
];

export const useGEAStore = create<GEAStore>()(
  persist(
    (set, get) => ({
      user: null,

      login: async (email: string, senha: string) => {
        const usuario = USUARIOS_DEMO.find(
          (u) => u.email === email.toLowerCase().trim() && u.senha === senha
        );
        if (usuario) {
          set({ user: { email: usuario.email, nome: usuario.nome } });
          return true;
        }
        return false;
      },

      logout: () => set({ user: null, geaAtual: null }),

      geas: [],
      geaAtual: null,

      setGeaAtual: (gea) => set({ geaAtual: gea }),

      salvarGEA: (gea) => {
        const { geas } = get();
        const idx = geas.findIndex((g) => g.id === gea.id);
        const atualizado = { ...gea, atualizadoEm: new Date().toISOString() };
        if (idx >= 0) {
          const novos = [...geas];
          novos[idx] = atualizado;
          set({ geas: novos, geaAtual: atualizado });
        } else {
          set({ geas: [atualizado, ...geas], geaAtual: atualizado });
        }
      },

      excluirGEA: (id) => {
        set((state) => ({
          geas: state.geas.filter((g) => g.id !== id),
          geaAtual: state.geaAtual?.id === id ? null : state.geaAtual,
        }));
      },

      getGEA: (id) => get().geas.find((g) => g.id === id),
    }),
    {
      name: 'gea-matematica-storage',
      partialize: (state) => ({ geas: state.geas, user: state.user }),
    }
  )
);
