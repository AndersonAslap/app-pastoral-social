import { VStack, HStack, Text, Pressable, Icon, Center, Box } from "@gluestack-ui/themed";
import { Package, Boxes, ShoppingBasket, BarChart2, User, Users, HomeIcon, HeartHandshakeIcon, Calendar } from "lucide-react-native";
import { config } from "../../../../config/gluestack-ui.config";
import { useNavigation } from "@react-navigation/native";

const actions = [
  {
    label: "Famílias",
    icon: Users,
    route: 'familiaListagem',
    color: "$primary600",
    bgColor: "$primary50",
    description: "Gerenciar famílias cadastradas"
  },
  {
    label: "Produtos",
    icon: Package,
    route: 'estoqueListagem',
    color: "$emerald600",
    bgColor: "$emerald50",
    description: "Controle de estoque"
  },
  {
    label: "Modelos",
    icon: Boxes,
    route: 'modeloTemplateListagem',
    color: "$orange600",
    bgColor: "$orange50",
    description: "Modelos de cestas básicas"
  },
  {
    label: "Cestas",
    icon: ShoppingBasket,
    route: 'cestaListagem',
    color: "$purple600",
    bgColor: "$purple50",
    description: "Cestas geradas"
  },
  {
    label: "Ajudas",
    icon: HeartHandshakeIcon,
    route: 'ajudaListagem',
    color: "$pink600",        
    bgColor: "$pink50",       
    description: "Solicitações e distribuições de ajuda"
  },
  {
    label: "Ações",
    icon: Calendar,
    route: 'acoesListagem',
    color: "$amber600",        
    bgColor: "$amber50",
    description: "Eventos e atividades programadas"
  },
  {
    label: "Relatórios",
    icon: BarChart2,
    route: 'relatorio',
    color: "$blue600",
    bgColor: "$blue50",
    description: "Relatórios e estatísticas"
  },
];

export default function HomeMenu() {
  const router = useNavigation();

  const handleGoNavigation = (path: string) => {
    if (path) {
      router.navigate(path as never);
    }
  };

  return (
    <VStack px="$6" py="$4" space="xl" bg="$backgroundLight50" flex={1}>

      {/* Grid de Ações */}
      <VStack space="md">
        <Text color="$textDark600" size="lg" fontFamily="$heading" fontWeight="$semibold">
          Menu Principal
        </Text>
        
        <HStack flexWrap="wrap" justifyContent="space-between" gap="$4">
          {actions.map((item, index) => (
            <Pressable
              key={index}
              w="47%"
              minHeight="$28"
              bg={item.bgColor}
              borderRadius="$2xl"
              borderWidth={1}
              borderColor={item.bgColor}
              overflow="hidden"
              shadowColor="#000"
              shadowOpacity={0.08}
              shadowOffset={{ width: 0, height: 2 }}
              shadowRadius={8}
              elevation={3}
              android_ripple={{ color: config.tokens.colors.primary200 }}
              onPress={() => handleGoNavigation(item.route)}
              sx={{
                ":active": {
                  transform: [{ scale: 0.98 }],
                  opacity: 0.9
                }
              }}
            >
              <VStack flex={1} p="$4" space="sm" justifyContent="space-between">
                {/* Ícone e Label */}
                <HStack space="sm" alignItems="center">
                  <Center
                    w="$10"
                    h="$10"
                    borderRadius="$lg"
                    bg={item.color}
                    opacity={0.15}
                  >
                    <Icon 
                      as={item.icon} 
                      size="lg" 
                      color={item.color} 
                    />
                  </Center>
                  <Text 
                    color="$textDark800" 
                    fontFamily="$heading" 
                    fontSize="$sm"
                    fontWeight="$semibold"
                    flex={1}
                    numberOfLines={1}
                  >
                    {item.label}
                  </Text>
                </HStack>

                {/* Descrição */}
                <Text 
                  color="$textDark500" 
                  fontFamily="$body" 
                  fontSize="$xs"
                  numberOfLines={2}
                  lineHeight="$xs"
                >
                  {item.description}
                </Text>

                {/* Indicador de Ação */}
                <Box 
                  position="absolute" 
                  top="$3" 
                  right="$3"
                  w="$2"
                  h="$2"
                  borderRadius="$full"
                  bg={item.route ? item.color : "$trueGray300"}
                />
              </VStack>
            </Pressable>
          ))}
        </HStack>
      </VStack>

      {/* Status ou Informações Adicionais */}
      <Box 
        bg="$primary50" 
        p="$4" 
        borderRadius="$2xl" 
        borderLeftWidth={4}
        borderLeftColor="$primary500"
        mt="$4"
      >
        <HStack space="sm" alignItems="center">
          <Icon as={HomeIcon} size="md" color="$primary600" />
          <VStack flex={1}>
            <Text color="$primary800" fontFamily="$heading" fontSize="$sm" fontWeight="$semibold">
              Sistema de Gestão Social
            </Text>
            <Text color="$primary600" fontFamily="$body" fontSize="$xs">
              {actions.length} módulos disponíveis
            </Text>
          </VStack>
        </HStack>
      </Box>
    </VStack>
  );
}