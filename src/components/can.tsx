// components/Can.tsx
import React from 'react';
import { usePermissions } from '@contexts/permission.context';
import { CanProps } from '@tipagens/permission';

export const Can: React.FC<CanProps> = ({ 
  children, 
  permission, 
  permissions, 
  mode = 'any', 
  fallback = null 
}) => {
    const { hasPermission, hasAnyPermission, hasAllPermissions } = usePermissions();

    let hasAccess = false;

    if (permission == null) {
        hasAccess = true; // Se nenhuma permissão for especificada, conceda acesso
    } else {
        if (permission) {
            hasAccess = hasPermission(permission);
        } else if (permissions && permissions.length > 0) {
            if (mode === 'all') {
                hasAccess = hasAllPermissions(permissions);
            } else {
                hasAccess = hasAnyPermission(permissions);
            }
        }
    }

    return hasAccess ? <>{children}</> : <>{fallback}</>;
};