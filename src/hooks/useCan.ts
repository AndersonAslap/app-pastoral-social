// hooks/useCan.ts
import { usePermissions } from '@contexts/permission.context';
import { Permission } from '@tipagens/permission';

interface UseCanReturn {
  can: (permission: Permission) => boolean;
  canAny: (permissions: Permission[]) => boolean;
  canAll: (permissions: Permission[]) => boolean;
}

export const useCan = (): UseCanReturn => {
  const { hasPermission, hasAnyPermission, hasAllPermissions } = usePermissions();

  const can = (permission: Permission): boolean => {
    return hasPermission(permission);
  };

  const canAny = (permissions: Permission[]): boolean => {
    return hasAnyPermission(permissions);
  };

  const canAll = (permissions: Permission[]): boolean => {
    return hasAllPermissions(permissions);
  };

  return { can, canAny, canAll };
};