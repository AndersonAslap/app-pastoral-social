import { Box, VStack, HStack, Text, Button, ButtonText, Badge, BadgeText } from "@gluestack-ui/themed";
import { Package, MapPin, Calendar, Trash2 } from "lucide-react-native";
import { getExpiryConfig } from "../helper/estoque.helper";
import { formatDate } from "@utils/functions";

type Product = {
    id: number
    validade: string
    valorMedida: number
    localizacao: string
    unidadeDeMedida: string
}

interface ProductoCardItemDetalheProps {
    product: Product;
    productName: string;
    onDelete: (product: Product) => void;
}

export const ProductoCardItemDetalhe = ({ product, productName, onDelete }: ProductoCardItemDetalheProps) => {
    const expiryConfig = getExpiryConfig(product.validade);
    const IconComponent = expiryConfig.icon;

    return (
        <Box
            bg={expiryConfig.bgColor}
            borderRadius="$xl"
            p="$4"
            borderLeftWidth="$4"
            borderLeftColor={expiryConfig.borderColor}
        >
            {/* Header do Card com Badge */}
            <HStack justifyContent="space-between" alignItems="flex-start" mb="$3">
                <VStack flex={1}>
                    <HStack alignItems="center" mb="$2">
                        <Package size={18} color="#374151" />
                        <Text fontSize="$lg" fontWeight="bold" ml="$2" color={expiryConfig.textColor}>
                            {productName}
                        </Text>
                    </HStack>
                    
                    {/* Badge de Quantidade */}
                    <Box alignSelf="flex-start" bg="$blue100" px="$3" py="$1" borderRadius="$md">
                        <Text fontSize="$sm" fontWeight="bold" color="$blue700">
                            {product.valorMedida} {product.unidadeDeMedida}
                        </Text>
                    </Box>
                </VStack>

                {/* Badge de Vencimento */}
                <Badge 
                    bg={expiryConfig.badgeBg}
                    borderWidth="$1"
                    borderColor={expiryConfig.badgeColor}
                    borderRadius="$full"
                    px="$3"
                    py="$1"
                >
                    <IconComponent size={12} color="blue" />
                    <BadgeText 
                        fontSize="$2xs" 
                        fontWeight="bold" 
                        color={expiryConfig.badgeText}
                        ml="$1"
                    >
                        {expiryConfig.label}
                    </BadgeText>
                </Badge>
            </HStack>

            {/* Informações do Produto */}
            <HStack space="lg" alignItems="center" mb="$2">
                <HStack alignItems="center" flex={1}>
                    <MapPin size={16} color="#6B7280" />
                    <Text fontSize="$sm" fontWeight="medium" color="$textDark600" ml="$2">
                        Local: {product.localizacao}
                    </Text>
                </HStack>
                
                <HStack alignItems="center" flex={1}>
                    <Calendar size={16} color="#6B7280" />
                    <Text 
                        fontSize="$sm" 
                        fontWeight="bold" 
                        color={expiryConfig.textColor}
                        ml="$2"
                    >
                        {formatDate(product.validade)}
                    </Text>
                </HStack>
            </HStack>

            {/* Botão de Exclusão */}
            <Button
                onPress={() => onDelete(product)}
                size="sm"
                variant="outline"
                action="negative"
                borderColor="$red300"
                mt="$3"
                $hover={{
                    borderColor: "$red400",
                    bg: "$red50"
                }}
            >
                <Trash2 size={14} color="#DC2626" />
                <ButtonText color="$red600" ml="$2" fontSize="$sm">
                    Excluir
                </ButtonText>
            </Button>
        </Box>
    );
};