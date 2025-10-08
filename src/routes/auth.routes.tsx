import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Home } from "@screens/home";
import { Login } from "@screens/login";

type AuthRoutes = {
    signIn: undefined;
    home: undefined;
}

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen
                name="signIn"
                component={Login}
            />

            <Screen
                name="home"
                component={Home}
            />
        </Navigator>
    )
}