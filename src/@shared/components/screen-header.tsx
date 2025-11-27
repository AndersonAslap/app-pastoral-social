import { Center, Heading, HStack, VStack, Button } from "@gluestack-ui/themed";
import { ChevronLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

type Props = {
    title: string;
    backTo?: string; // Rota específica para voltar
}

export function ScreenHeader({ title, backTo }: Props) {
    const navigation = useNavigation();

    const handleGoBack = () => {
        if (backTo) {
            // Navega para uma rota específica
            navigation.navigate(backTo as never);
        } else if (navigation.canGoBack()) {
            // Volta para a tela anterior
            navigation.goBack();
        }
        // Se não pode voltar e não tem rota específica, não faz nada
    };

    return (
        <Center
            bg="$blue100" 
            pb="$6" 
            pt="$16"
        >
            <HStack 
                alignItems="center" 
                justifyContent="space-between" 
                width="100%"
                px="$4"
            >
                {/* Botão Voltar */}
                <Button 
                    variant="link"
                    onPress={handleGoBack}
                    p="$2"
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <ChevronLeft size={24} color="#1e3a8a" />
                </Button>

                {/* Título Centralizado */}
                <Heading
                    color="$blue900"
                    fontSize="$xl"
                    fontFamily="$heading"
                    flex={1}
                    textAlign="center"
                >
                    {title}
                </Heading>

                {/* Espaço vazio para balancear o layout */}
                <Button 
                    variant="link"
                    p="$2"
                    opacity={0}
                    disabled
                >
                    <ChevronLeft size={24} color="transparent" />
                </Button>
            </HStack>
        </Center>
    );
}