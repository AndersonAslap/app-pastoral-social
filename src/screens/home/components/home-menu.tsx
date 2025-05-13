import { VStack, HStack, Text, Pressable, Icon, Center } from "@gluestack-ui/themed";
import { Package, Boxes, ShoppingBasket, BarChart2, User } from "lucide-react-native";
import { config } from "../../../../config/gluestack-ui.config";
import { useNavigation } from "@react-navigation/native";

const actions = [
  { 
    label: "Produtos", 
    icon: Package,
    route: 'product'
  },
  { 
    label: "Modelos de cesta", 
    icon: Boxes,
    route: 'modelCesta'
  },
  { 
    label: "Cestas gerada", 
    icon: ShoppingBasket,
    route: ''
  },
  { 
    label: "Relatórios", 
    icon: BarChart2,
    route: ''
  },
];

export default function HomeMenu() {

  const router = useNavigation();

  const handleGoNavigation = (path: string) => {
    router.navigate(path as never);
  }

  return (
    <VStack px="$4" py="$2" space="lg">
      <HStack flexWrap="wrap" justifyContent="space-between" gap={16}>
        {actions.map((item, index) => (
          <Pressable
            key={index}
            w="47%"
            h="$24"
            bg="$blue100"
            borderRadius="$2xl"
            overflow="hidden"
            shadowColor="#000"
            shadowOpacity={0.06}
            shadowOffset={{ width: 0, height: 1 }}
            shadowRadius={4}
            android_ripple={{ color: config.tokens.colors.green500 }}
            onPress={() => handleGoNavigation(item.route)}
        >
          <Center flex={1}>
            <Icon as={item.icon} size="lg" color="$blue600" mb="$1" />
            <Text color="$gray400" fontFamily="$heading" fontSize="$sm">
              {item.label}
            </Text>
          </Center>
        </Pressable>
        ))}
      </HStack>
    </VStack>
  );
}
