import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DoadorDetalheAcao, DoadorListagemAcoes, DoacaoAcao } from "../../modules/doador";
import { Jornada } from "../../modules/jornada";
import { Login } from "../../modules/auth/screens/login";

type AuthRoutes = {
    jornada: undefined;
    signIn: undefined;
    doadorListagemAcoes: undefined;
    doadorDetalheAcao: { id: number };
    doacaoAcao: { id: number }
}

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen
                name="jornada"
                component={Jornada}
            />

            <Screen
                name="signIn"
                component={Login}
            />

            <Screen
                name="doadorListagemAcoes"
                component={DoadorListagemAcoes}
            />

            <Screen
                name="doadorDetalheAcao"
                component={DoadorDetalheAcao}
            />  

            <Screen
                name="doacaoAcao"
                component={DoacaoAcao}
            />       
        </Navigator>
    )
}