import { NavigationContainer } from "@react-navigation/native";
import { Box } from "@gluestack-ui/themed";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";
import { useAuth } from "@hooks/useAuth";
import { Loading } from "@components/loading";

export function Routes() {
    const { user, isLoadingUserStorageData } = useAuth();

    if (isLoadingUserStorageData) {
        return <Loading />;
    }

    return (
        <Box flex={1}>
            <NavigationContainer>
                {user?.userId ? <AppRoutes /> : <AuthRoutes />}
            </NavigationContainer>
        </Box>
    )
}