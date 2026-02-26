import { useAuth } from "@/features/auth/auth.context";
import { ROLE_PERMISSIONS } from "@/shared/constants/rolePermissions";

export function usePermission() {
  const { user } = useAuth();

  const hasPermission = (permission) => {
    if (!user) return false;

    const permissions = ROLE_PERMISSIONS[user.role] || [];

    return permissions.includes(permission);
  };

  return { hasPermission };
}