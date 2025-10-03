import { NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { Box } from "@gluestack-ui/themed";
import { AppRoutes } from "./app.routes";

export function Routes() {
    return (
        <Box flex={1}>
            <NavigationContainer>
                <AuthRoutes />
            </NavigationContainer>
        </Box>
    )
}