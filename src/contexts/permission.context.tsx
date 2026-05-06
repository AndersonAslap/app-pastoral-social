// contexts/PermissionContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Permission, PermissionContextType } from '@tipagens/permission';
import { storageUserGet } from '@storage/storageUser';

const PermissionContext = createContext<PermissionContextType | undefined>(undefined);

export const usePermissions = (): PermissionContextType => {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error('usePermissions must be used within PermissionProvider');
  }
  return context;
};

interface PermissionProviderProps {
  children: ReactNode;
}

export const PermissionProvider: React.FC<PermissionProviderProps> = ({ children }) => {

  const [userPermissions, setUserPermissions] = useState<Permission[]>([]);

  const setPermissions = (permissions: Permission[]): void => {
    setUserPermissions(permissions);
  };

  const hasPermission = (permission: Permission): boolean => {
    return userPermissions.includes(permission);
  };

  const hasAnyPermission = (permissions: Permission[]): boolean => {
    return permissions.some(permission => userPermissions.includes(permission));
  };

  const hasAllPermissions = (permissions: Permission[]): boolean => {
    return permissions.every(permission => userPermissions.includes(permission));
  };

  useEffect(() => {
    const loadUserPermissions = async () => {
      const userLogged = await storageUserGet();
      if (userLogged && userLogged.permissions) {
        setUserPermissions(userLogged.permissions as Permission[]);
      }
    };
    
    loadUserPermissions();
  }, []);

  const value: PermissionContextType = {
    userPermissions,
    setPermissions,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
  };

  return (
    <PermissionContext.Provider value={value}>
      {children}
    </PermissionContext.Provider>
  );
};