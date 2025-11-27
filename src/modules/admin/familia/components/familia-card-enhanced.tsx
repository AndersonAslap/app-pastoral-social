import React from "react";
import { IResponseListarFamilias } from "../../../../@shared/types/responses";
import { Text, VStack, HStack, Box, Badge, BadgeText } from "@gluestack-ui/themed";
import { MapPinIcon, UsersIcon, PhoneIcon, ChurchIcon } from "lucide-react-native";

interface FamiliaCardEnhancedProps {
    familia: IResponseListarFamilias;
}

export const FamilyCardEnhancede: React.FC<FamiliaCardEnhancedProps> = ({ familia }) => {
    return (
        <Box
            bg="$backgroundLight0"
            p="$4"
            mb="$3"
            borderRadius="$2xl"
            borderWidth={1}
            borderColor="$borderLight200"
        >
            <HStack justifyContent="space-between" alignItems="flex-start" mb="$3">
                <VStack flex={1} mr="$2">
                    <Text fontWeight="$bold" size="lg" color="$textDark800" numberOfLines={1}>
                        {familia.nomeRepresentante}
                    </Text>
                    <Text size="sm" color="$textDark500" mt="$1">
                        Representante familiar
                    </Text>
                </VStack>
            </HStack>

            <VStack gap="$2" mb="$3">
                <HStack alignItems="center" space="sm">
                    <MapPinIcon size={16} color="#64748b" />
                    <Text size="sm" color="$textDark600" flex={1} numberOfLines={2}>
                        {familia.endereco}
                    </Text>
                </HStack>
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

            <HStack justifyContent="space-between" alignItems="center">
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