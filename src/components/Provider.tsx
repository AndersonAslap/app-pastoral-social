import { AuthContextProvider } from "@contexts/auth.context";
import { PermissionProvider } from "@contexts/permission.context";

export const Provider = ({children}: {children: React.ReactNode}) => {
    return (
        <PermissionProvider>
            <AuthContextProvider>
                {children}
            </AuthContextProvider>
        </PermissionProvider>
    )
};