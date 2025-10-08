import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HelpList } from "@screens/help/list";
import { Home } from "@screens/home";
import { HeartHandshakeIcon, HomeIcon, SettingsIcon, UsersRoundIcon } from "lucide-react-native";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { Platform } from "react-native";
import { ProductList } from "@screens/product/list";
import { ProductRegister } from "@screens/product/register";

import { ModeloTemplateCadastrarForm, ModeloTemplateListagem } from "@screens/modeloTemplate";
import { FamiliaCadastrarForm, FamiliaListagem, FamiliaMenu } from "@screens/familia";

type AppRoutes = {
    home: undefined;
    help: undefined;

    perfilUsuario: undefined;

    familiaListagem: undefined;
    familiaCadastrar: undefined;
    familiaMenu: undefined;

    product: undefined;
    productRegister: undefined;
    cesta: undefined;

    modeloTemplateListagem: undefined;
    modeloTemplateCadastrar: undefined;
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
                name="help"
                component={HelpList}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color }) => <HeartHandshakeIcon size={24} color={color} />
                }}
            />

            <Screen
                name="perfilUsuario"
                component={HelpList}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color }) => <SettingsIcon size={24} color={color} />
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
                name="product"
                component={ProductList}
                options={{
                    tabBarButton: () => null
                }}
            />

            <Screen
                name="productRegister"
                component={ProductRegister}
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
                name="cesta"
                component={ProductList}
                options={{
                    tabBarButton: () => null
                }}
            />
        </Navigator>
    )
}