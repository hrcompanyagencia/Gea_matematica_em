import { Navigate } from 'react-router-dom';
import { useGEAStore } from '../store/useGEAStore';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = useGEAStore((s) => s.user);
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
