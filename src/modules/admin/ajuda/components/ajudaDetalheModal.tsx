
import React from "react";
import {
    Modal,
    ModalBackdrop,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Text,
    VStack,
    HStack,
    Box,
    Badge,
    BadgeText,
    Button,
    ButtonText,
    Icon,
    ScrollView
} from "@gluestack-ui/themed";
import { X, MapPin, User, Calendar, Package, Heart, Clock, CheckCircle, AlertCircle, FileText } from "lucide-react-native";

interface AjudaDetalheModalProps {
    isOpen: boolean;
    ajuda: any; // Substitua pelo tipo correto
    onClose: () => void;
}

// Configurações de status
const getStatusConfig = (status: string) => {
    const configs: Record<string, { color: string; bg: string; icon: any; label: string }> = {
        'AGUARDANDO_APROVACAO': {
            color: '$orange500',
            bg: '$orange50',
            icon: Clock,
            label: 'Aguardando Aprovação'
        },
        'APROVADA': {
            color: '$green500',
            bg: '$green50',
            icon: CheckCircle,
            label: 'Aprovada'
        },
        'ENTREGUE': {
            color: '$blue500',
            bg: '$blue50',
            icon: CheckCircle,
            label: 'Entregue'
        },
        'CANCELADA': {
            color: '$red500',
            bg: '$red50',
            icon: AlertCircle,
            label: 'Cancelada'
        }
    };
    return configs[status] || configs['AGUARDANDO_APROVACAO'];
};

// Configurações de tipo de ajuda
const getTipoAjudaConfig = (tipo: string) => {
    const configs: Record<string, { color: string; bg: string; icon: any }> = {
        'Cesta Básica': { color: '$green500', bg: '$green50', icon: Package },
        'Alimentação': { color: '$orange500', bg: '$orange50', icon: Heart },
        'Educação': { color: '$purple500', bg: '$purple50', icon: Heart },
        'Saúde': { color: '$red500', bg: '$red50', icon: Heart },
        'Moradia': { color: '$blue500', bg: '$blue50', icon: Heart }
    };
    return configs[tipo] || { color: '$primary500', bg: '$primary50', icon: Heart };
};

// Função para formatar data
const formatDate = (dateString: string | null) => {
    if (!dateString) return "Não definida";
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};

export const AjudaDetalheModal: React.FC<AjudaDetalheModalProps> = ({
    isOpen,
    ajuda,
    onClose
}) => {
    if (!ajuda) return null;

    const statusConfig = getStatusConfig(ajuda.statusAjuda);
    const StatusIcon = statusConfig.icon;
    const tipoConfig = getTipoAjudaConfig(ajuda.tipoAjuda);
    const TipoIcon = tipoConfig.icon;
    const isCestaBasica = ajuda.tipoAjuda === "Cesta Básica";

    // Texto de observação fixo (lorem ipsum)
    const observacao = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="full">
            <ModalBackdrop />
            <ModalContent 
                borderTopLeftRadius="$3xl" 
                borderTopRightRadius="$3xl" 
                marginTop="auto" 
                marginBottom={0}
                maxHeight="90%"
            >
                <ModalHeader 
                    backgroundColor="$backgroundLight50" 
                    borderTopLeftRadius="$3xl" 
                    borderTopRightRadius="$3xl"
                >
                    <HStack alignItems="center" justifyContent="space-between" width="100%">
                        <Text fontSize="$xl" fontWeight="$bold" color="$textDark800">
                            Detalhes da Ajuda
                        </Text>
                        <Button size="sm" variant="link" onPress={onClose}>
                            <Icon as={X} size="lg" color="$textDark600" />
                        </Button>
                    </HStack>
                </ModalHeader>
                
                <ModalBody px="$4" py="$6">
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <VStack space="lg">
                            {/* Header com Tipo e Status */}
                            <VStack>
                                <HStack justifyContent="space-between" alignItems="center" mb="$2">
                                    <Badge 
                                        size="sm" 
                                        bg={tipoConfig.bg}
                                        borderWidth="$1"
                                        borderColor={tipoConfig.color}
                                    >
                                        <TipoIcon size={12} color={tipoConfig.color} />
                                        <BadgeText color={tipoConfig.color} ml="$1" fontSize="$2xs" fontWeight="$bold">
                                            {ajuda.tipoAjuda}
                                        </BadgeText>
                                    </Badge>

                                    <Badge 
                                        size="sm" 
                                        bg={statusConfig.bg}
                                        borderWidth="$1"
                                        borderColor={statusConfig.color}
                                    >
                                        <StatusIcon size={12} color={statusConfig.color} />
                                        <BadgeText color={statusConfig.color} ml="$1" fontSize="$2xs" fontWeight="$bold">
                                            {statusConfig.label}
                                        </BadgeText>
                                    </Badge>
                                </HStack>
                            </VStack>

                            {/* Informações do Representante */}
                            <Box 
                                bg="$backgroundLight50" 
                                p="$4" 
                                borderRadius="$lg"
                                borderWidth={1}
                                borderColor="$borderLight200"
                            >
                                <Text fontSize="$md" fontWeight="$medium" color="$textDark700" mb="$3">
                                    Dados da Família
                                </Text>
                                
                                <VStack space="md">
                                    <HStack space="md" alignItems="center">
                                        <User size={18} color="#6B7280" />
                                        <Text fontSize="$sm" color="$textDark800" flex={1}>
                                            {ajuda.representante}
                                        </Text>
                                    </HStack>

                                    <HStack space="md" alignItems="center">
                                        <MapPin size={18} color="#6B7280" />
                                        <Text fontSize="$sm" color="$textDark600" flex={1}>
                                            {ajuda.endereco}
                                        </Text>
                                    </HStack>

                                    <HStack space="md" alignItems="center">
                                        <Calendar size={18} color="#6B7280" />
                                        <Text fontSize="$sm" color="$textDark600" flex={1}>
                                            Data de Entrega: {formatDate(ajuda.dataEntrega)}
                                        </Text>
                                    </HStack>
                                </VStack>
                            </Box>

                            {/* Dados da Cesta - Condicional */}
                            {isCestaBasica && ajuda.cesta && (
                                <VStack space="md">
                                    <HStack alignItems="center" mb="$1">
                                        <Package size={20} color={tipoConfig.color} />
                                        <Text fontSize="$md" fontWeight="$bold" color="$textDark800" ml="$2">
                                            {ajuda.cesta.identificadorCesta}
                                        </Text>
                                    </HStack>

                                    {ajuda.cesta.descricao && (
                                        <Text fontSize="$sm" color="$textDark600">
                                            {ajuda.cesta.descricao}
                                        </Text>
                                    )}

                                    {/* Itens da Cesta */}
                                    <VStack space="sm" mt="$2">
                                        <Text fontSize="$sm" fontWeight="$medium" color="$textDark700">
                                            Itens da Cesta ({ajuda.cesta.itens.length})
                                        </Text>

                                        {ajuda.cesta.itens.map((item: any) => (
                                            <HStack 
                                                key={item.idItemProduto}
                                                justifyContent="space-between"
                                                alignItems="center"
                                                bg="$backgroundLight50"
                                                p="$3"
                                                borderRadius="$lg"
                                                borderWidth={1}
                                                borderColor="$borderLight200"
                                            >
                                                <VStack flex={1}>
                                                    <Text fontSize="$sm" fontWeight="$medium" color="$textDark800">
                                                        {item.nomeProduto}
                                                    </Text>
                                                    {item.detalhe && (
                                                        <Text fontSize="$xs" color="$textDark500">
                                                            {item.detalhe}
                                                        </Text>
                                                    )}
                                                </VStack>
                                                <Box
                                                    bg={tipoConfig.bg}
                                                    px="$2"
                                                    py="$1"
                                                    borderRadius="$md"
                                                >
                                                    <Text fontSize="$sm" fontWeight="$bold" color={tipoConfig.color}>
                                                        {item.quantidade}x
                                                    </Text>
                                                </Box>
                                            </HStack>
                                        ))}
                                    </VStack>

                                    {/* Resumo da Cesta */}
                                    <Box 
                                        bg={tipoConfig.bg}
                                        p="$3" 
                                        borderRadius="$lg"
                                        borderWidth={1}
                                        borderColor={tipoConfig.color}
                                        mt="$2"
                                    >
                                        <HStack justifyContent="space-between" alignItems="center">
                                            <Text fontSize="$sm" fontWeight="$medium" color={tipoConfig.color}>
                                                Total de Itens
                                            </Text>
                                            <Text fontSize="$lg" fontWeight="$bold" color={tipoConfig.color}>
                                                {ajuda.cesta.itens.length}
                                            </Text>
                                        </HStack>
                                    </Box>
                                </VStack>
                            )}

                            {/* Mensagem quando não é Cesta Básica */}
                            {!isCestaBasica && (
                                <Box 
                                    bg="$backgroundLight50"
                                    p="$6" 
                                    borderRadius="$lg"
                                    borderWidth={1}
                                    borderColor="$borderLight200"
                                    alignItems="center"
                                >
                                    <TipoIcon size={32} color={tipoConfig.color} />
                                    <Text fontSize="$md" fontWeight="$medium" color="$textDark700" mt="$3" textAlign="center">
                                        Ajuda do tipo {ajuda.tipoAjuda}
                                    </Text>
                                    <Text fontSize="$sm" color="$textDark500" mt="$1" textAlign="center">
                                        Detalhes específicos disponíveis em breve
                                    </Text>
                                </Box>
                            )}

                            {/* Campo de Observação - NOVO */}
                            <Box 
                                bg="$backgroundLight50"
                                p="$4" 
                                borderRadius="$lg"
                                borderWidth={1}
                                borderColor="$borderLight200"
                            >
                                <HStack alignItems="center" mb="$3">
                                    <FileText size={18} color="#6B7280" />
                                    <Text fontSize="$md" fontWeight="$medium" color="$textDark700" ml="$2">
                                        Observações
                                    </Text>
                                </HStack>
                                
                                <Box
                                    bg="$white"
                                    p="$3"
                                    borderRadius="$md"
                                    borderWidth={1}
                                    borderColor="$borderLight200"
                                >
                                    <Text fontSize="$sm" color="$textDark600" lineHeight="$sm">
                                        {observacao}
                                    </Text>
                                </Box>
                            </Box>

                            {/* Informações de Status */}
                            <Box 
                                bg="$backgroundLight50"
                                p="$3" 
                                borderRadius="$lg"
                                borderWidth={1}
                                borderColor="$borderLight200"
                            >
                                <HStack justifyContent="space-between" alignItems="center">
                                    <Text fontSize="$sm" color="$textDark600">Status da Ajuda</Text>
                                    <Badge size="sm" bg={statusConfig.bg}>
                                        <BadgeText color={statusConfig.color} fontSize="$2xs">
                                            {statusConfig.label}
                                        </BadgeText>
                                    </Badge>
                                </HStack>
                            </Box>
                        </VStack>
                    </ScrollView>
                </ModalBody>

                <ModalFooter 
                    backgroundColor="$backgroundLight50" 
                    borderBottomLeftRadius="$3xl" 
                    borderBottomRightRadius="$3xl"
                >
                    <HStack space="sm" width="100%">
                        <Button 
                            flex={1} 
                            size="md" 
                            variant="outline" 
                            bg="$white"
                            onPress={onClose}
                            borderWidth={1}
                            borderColor="$borderLight300"
                        >
                            <ButtonText color="$textDark600">Fechar</ButtonText>
                        </Button>
                        
                        {/* Botões condicionais baseados no status - descomente quando necessário */}
                        {/* {ajuda.statusAjuda === 'AGUARDANDO_APROVACAO' && (
                            <Button flex={1} size="md" bg="$green600" onPress={onAprovar}>
                                <ButtonText color="$white">Aprovar</ButtonText>
                            </Button>
                        )}
                        
                        {ajuda.statusAjuda === 'APROVADA' && (
                            <Button flex={1} size="md" bg="$blue600" onPress={onRegistrarEntrega}>
                                <ButtonText color="$white">Registrar Entrega</ButtonText>
                            </Button>
                        )} */}
                    </HStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};