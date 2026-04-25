import { NavigationContainer } from "@react-navigation/native";
import { Box } from "@gluestack-ui/themed";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";
import { useAuth } from "../hooks/useAuth";
import { Loading } from "@components/loading";

const linking = {
    prefixes: ['app-pastoral-social://'],
    config: {
        screens: {
            doadorDetalheAcao: {
                path: "/doadorDetalheAcao/:id",
                parse: {
                    id: (id: string) => id
                }
            }
        }
    }
}

export function Routes() {
    const { user, isLoadingUserStorageData } = useAuth();

    if (isLoadingUserStorageData) {
        return <Loading />;
    }

    return (
        <Box flex={1}>
            <NavigationContainer linking={linking}>
                {user?.userId ? <AppRoutes /> : <AuthRoutes />}
            </NavigationContainer>
        </Box>
    )
}