import { Navigate } from "react-router-dom";
import { useAuth } from "@/features/auth/auth.context";
import { usePermission } from "@/shared/hooks/usePermission";

export default function ProtectedRoute({
  children,
  permission,
}) {
  const { user, loading } = useAuth();
  const { hasPermission } = usePermission();

  if (loading) return null;

  if (!user) return <Navigate to="/login" replace />;

  if (permission && !hasPermission(permission)) {
    return <Navigate to="/" replace />;
  }

  return children;
}