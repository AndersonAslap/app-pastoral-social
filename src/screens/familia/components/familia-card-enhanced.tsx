import React from "react";
import { IResponseListarFamilias } from "@tipagens/responses";
import { Text, VStack, HStack, Box, Badge, BadgeText, Divider } from "@gluestack-ui/themed";
import { MapPinIcon, UsersIcon, PhoneIcon, ChurchIcon } from "lucide-react-native";
import { FamiliaCardActions } from "./familia-card-actions";
import { Linking, Alert } from "react-native";
import { getPrimeiroEUltimoNome } from "@utils/functions";

interface FamiliaCardEnhancedProps {
    familia: IResponseListarFamilias;
    onDelete?: () => void;
}

export const FamilyCardEnhancede: React.FC<FamiliaCardEnhancedProps> = ({ familia, onDelete }) => {
    
    const handleWhatsApp = () => {
        const phoneNumber = familia.telefone?.replace(/\D/g, '');
        if (phoneNumber) {
            Linking.openURL(`whatsapp://send?phone=55${phoneNumber}`);
        }
    };

    const handleCall = () => {
        const phoneNumber = familia.telefone?.replace(/\D/g, '');
        if (phoneNumber) {
            Linking.openURL(`tel:${phoneNumber}`);
        }
    };

    const handleDelete = () => {
        Alert.alert(
            "Excluir Família",
            `Tem certeza que deseja excluir a família de ${familia.nomeRepresentante}?`,
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Excluir", onPress: onDelete, style: "destructive" }
            ]
        );
    };

    return (
        <Box
            bg="$backgroundLight0"
            p="$4"
            mb="$3"
            borderRadius="$2xl"
            borderWidth={1}
            borderColor="$borderLight200"
        >
            {/* Header com ações */}
            <HStack justifyContent="space-between" alignItems="flex-start" mb="$3">
                <VStack flex={1} mr="$2">
                    <Text fontWeight="$bold" size="lg" color="$textDark800" numberOfLines={1}>
                        {getPrimeiroEUltimoNome(familia.nomeRepresentante)}
                    </Text>
                    <Text size="sm" color="$textDark500" mt="$1">
                        Representante familiar
                    </Text>
                </VStack>
                
                 <FamiliaCardActions 
                    onWhatsApp={handleWhatsApp}
                    onCall={handleCall}
                    onDelete={handleDelete}
                />
            </HStack>

            <Divider my="$2" />

            {/* Informações da família */}
            <VStack gap="$2" mb="$3" mt="$2">
                {
                    familia.endereco?.trim() && (
                        <HStack alignItems="center" space="sm">
                            <MapPinIcon size={16} color="#64748b" />
                            <Text size="sm" color="$textDark600" flex={1} numberOfLines={2}>
                                {familia.endereco}
                            </Text>
                        </HStack>
                    )
                }
                {familia.comunidade && (
                    <HStack alignItems="center" space="sm">
                        <ChurchIcon size={16} color="#7c3aed" />
                        <Text size="sm" color="$textDark600" flex={1}>
                            {familia.comunidade}
                        </Text>
                    </HStack>
                )}
                
                {familia.telefone && (
                    <HStack alignItems="center" space="sm">
                        <PhoneIcon size={16} color="#64748b" />
                        <Text size="sm" color="$textDark600">
                            {familia.telefone}
                        </Text>
                    </HStack>
                )}
            </VStack>

            <Divider my="$2" />

            {/* Footer com estatísticas */}
            <HStack justifyContent="space-between" alignItems="center" mt="$2">
                <HStack alignItems="center" space="sm">
                    <UsersIcon size={14} color="#64748b" />
                    <Text size="xs" color="$textDark500">
                        {familia.qtdPessoasResidencia || 0} pessoas
                    </Text>
                </HStack>
                <HStack alignItems="center" space="sm">
                    <Text size="xs" color="$textDark500">
                        {familia.qtdPessoasEmpregadas || 0} empregadas
                    </Text>
                </HStack>
                {familia.criancasFrequentamEscola && (
                    <Badge size="sm" bg="$blue100" borderRadius="$md">
                        <BadgeText color="$blue800" size="xs">
                            ESTUDA
                        </BadgeText>
                    </Badge>
                )}
            </HStack>
        </Box>
    );
};