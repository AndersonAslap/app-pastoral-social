import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "@screens/home";
import { HomeIcon, SettingsIcon } from "lucide-react-native";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { Platform } from "react-native";

import { EstoqueCadastrar } from "@screens/estoque/cadastrar";

import { ModeloTemplateCadastrarForm, ModeloTemplateListagem } from "@screens/modeloTemplate";
import { FamiliaCadastrarForm, FamiliaListagem, FamiliaMenu } from "@screens/familia";
import { EstoqueDetalhes, EstoqueListagem } from "@screens/estoque";
import { AjudaListagem } from "@screens/ajuda";
import { Perfil } from "@screens/perfil";
import { CestaListagem } from "@screens/cesta";
import { Relatorio } from "@screens/relatorio";
import { AcoesListagem } from "@screens/acoes";


export type AppRoutes = {
    home: undefined;
    ajudaListagem: undefined;

    perfilUsuario: undefined;

    familiaListagem: undefined;
    familiaCadastrar: undefined;
    familiaMenu: undefined;

    estoqueListagem: undefined;
    estoqueCadastrar: undefined;
    estoqueDetalhes: { productId: number, nome: string };

    cestaListagem: undefined;

    modeloTemplateListagem: undefined;
    modeloTemplateCadastrar: undefined;

    acoesListagem: undefined;

    relatorio: undefined;
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {

    const { tokens } = gluestackUIConfig;

    const iconSize = tokens.space["6"];

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: true,
                tabBarActiveTintColor: tokens.colors.blue500,
                tabBarInactiveTintColor: tokens.colors.gray200,
                tabBarStyle: {
                    borderTopWidth: 0,
                    height: Platform.OS === "android" ? "auto" : 96,
                    paddingBottom: tokens.space["10"],
                    paddingTop: tokens.space["6"]
                }
            }}
        >
            <Screen
                name="home"
                component={Home}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color }) => <HomeIcon size={iconSize} color={color} />
                }}
            />

            <Screen
                name="perfilUsuario"
                component={Perfil}
                options={{
                    tabBarLabel: "Perfil",
                    tabBarIcon: ({ color }) => <SettingsIcon size={24} color={color} />
                }}
            />

            <Screen
                name="ajudaListagem"
                component={AjudaListagem}
                options={{
                    tabBarButton: () => null
                }}
            />

            <Screen
                name="familiaListagem"
                component={FamiliaListagem}
                options={{
                    tabBarButton: () => null
                }}
            />

            <Screen
                name="familiaCadastrar"
                component={FamiliaCadastrarForm}
                options={{
                    tabBarButton: () => null
                }}
            />

            <Screen
                name="familiaMenu"
                component={FamiliaMenu}
                options={{
                    tabBarButton: () => null
                }}
            />

            <Screen
                name="estoqueListagem"
                component={EstoqueListagem}
                options={{
                    tabBarButton: () => null
                }}
            />

            <Screen
                name="estoqueCadastrar"
                component={EstoqueCadastrar}
                options={{
                    tabBarButton: () => null
                }}
            />

            <Screen
                name="estoqueDetalhes"
                component={EstoqueDetalhes}
                options={{
                    tabBarButton: () => null
                }}
            />

            <Screen
                name="modeloTemplateListagem"
                component={ModeloTemplateListagem}
                options={{
                    tabBarButton: () => null
                }}
            />

            <Screen
                name="modeloTemplateCadastrar"
                component={ModeloTemplateCadastrarForm}
                options={{
                    tabBarButton: () => null
                }}
            />

            <Screen
                name="cestaListagem"
                component={CestaListagem}
                options={{
                    tabBarButton: () => null
                }}
            />

            <Screen
                name="relatorio"
                component={Relatorio}
                options={{
                    tabBarButton: () => null
                }}
            />

            <Screen
                name="acoesListagem"
                component={AcoesListagem}
                options={{
                    tabBarButton: () => null
                }}
            />

            
        </Navigator>
    )
}