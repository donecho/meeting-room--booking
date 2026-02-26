import { useAuth } from "@/features/auth/auth.context";
import { ROLE_PERMISSIONS } from "@/shared/constants/rolePermissions";

export function usePermission() {
  const { user } = useAuth();

  const hasPermission = (permission) => {
    if (!user) return false;
    return ROLE_PERMISSIONS[user.role]?.includes(permission);
  };

  return { hasPermission };
}