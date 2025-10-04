import { NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { Box } from "@gluestack-ui/themed";
import { AppRoutes } from "./app.routes";
import { useContext } from "react";
import AuthContext from "@contexts/auth.context";

export function Routes() {

    const contextData = useContext(AuthContext);

    return (
        <Box flex={1}>
            <NavigationContainer>
                <AppRoutes />
            </NavigationContainer>
        </Box>
    )
}