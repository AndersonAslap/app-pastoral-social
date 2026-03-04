import { Pressable, Text, View } from "@gluestack-ui/themed";
import { VStack } from "@gluestack-ui/themed";
import { HStack } from "@gluestack-ui/themed";
import { Box } from "@gluestack-ui/themed";
import { Badge, BadgeText } from "@gluestack-ui/themed";
import { getStatusApi } from "@services/status-api";
import { useEffect, useState } from "react";

// Adicione este componente antes do return da sua Jornada
export const ApiStatusBlock = () => {
    const [apiStatus, setApiStatus] = useState<any>({
        status: 'checking',
        lastCheck: null
    });
    
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    const checkApiHealth = async () => {
        try {
            const statusOk = await getStatusApi();
            
            if (statusOk) {
                setApiStatus({
                    status: 'online',
                    lastCheck: new Date()
                });
            } else {
                setApiStatus({
                    status: 'offline',
                    lastCheck: new Date()
                });
            }
        } catch (error) {
            setApiStatus({
                status: 'offline',
                lastCheck: new Date()
            });
        }
    };

    useEffect(() => {
        checkApiHealth();
        
        // Verifica a cada 30 segundos se a API continua online
        const interval = setInterval(checkApiHealth, 30000);
        
        return () => clearInterval(interval);
    }, []);

    // Não mostrar nada enquanto verifica
    if (apiStatus.status === 'checking') return null;

    const getStatusColor = () => {
        switch (apiStatus.status) {
            case 'online': return '$green500';
            case 'offline': return '$red500';
            default: return '$yellow500';
        }
    };

    const getStatusText = () => {
        switch (apiStatus.status) {
            case 'online': return 'API Online';
            case 'offline': return 'API Offline';
            default: return 'Verificando...';
        }
    };

    const formatLastCheck = () => {
        if (!apiStatus.lastCheck) return '';
        return apiStatus.lastCheck.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    return (
        <Box
            bg="$white"
            borderRadius="$lg"
            p="$4"
            borderWidth="$1"
            borderColor="$trueGray200"
            width="100%"
            maxWidth="$96"
            mt="$4"
        >
            <VStack gap="$3">
                {/* Header com status */}
                <HStack justifyContent="space-between" alignItems="center">
                    <HStack gap="$2" alignItems="center">
                        <Box
                            w="$2"
                            h="$2"
                            borderRadius="$full"
                            bg={getStatusColor()}
                            style={{
                                shadowColor: getStatusColor().replace('$', '#'),
                                shadowOffset: { width: 0, height: 0 },
                                shadowOpacity: 0.5,
                                shadowRadius: 4,
                                elevation: 4
                            }}
                        />
                        <Text fontWeight="$semibold" color="$textDark900">
                            Status da API
                        </Text>
                    </HStack>
                    
                    <Badge
                        action={apiStatus.status === 'online' ? 'success' : 'error'}
                        variant="solid"
                        borderRadius="$full"
                    >
                        <BadgeText>
                            {getStatusText()}
                        </BadgeText>
                    </Badge>
                </HStack>

                {/* Informações da API */}
                <VStack gap="$2">
                    <HStack justifyContent="space-between">
                        <Text fontSize="$sm" color="$textDark500">
                            URL:
                        </Text>
                        <Text fontSize="$sm" color="$textDark700" fontWeight="$medium">
                            {apiUrl}
                        </Text>
                    </HStack>

                    {apiStatus.status === 'online' && apiStatus.responseTime && (
                        <HStack justifyContent="space-between">
                            <Text fontSize="$sm" color="$textDark500">
                                Tempo de resposta:
                            </Text>
                            <HStack gap="$1" alignItems="center">
                                <Text fontSize="$sm" color="$textDark700" fontWeight="$medium">
                                    {apiStatus.responseTime}ms
                                </Text>
                                <Box
                                    w="$1.5"
                                    h="$1.5"
                                    borderRadius="$full"
                                    bg={apiStatus.responseTime < 300 ? '$green500' : apiStatus.responseTime < 800 ? '$yellow500' : '$red500'}
                                />
                            </HStack>
                        </HStack>
                    )}

                    {apiStatus.lastCheck && (
                        <HStack justifyContent="space-between">
                            <Text fontSize="$sm" color="$textDark500">
                                Última verificação:
                            </Text>
                            <Text fontSize="$sm" color="$textDark700" fontWeight="$medium">
                                {formatLastCheck()}
                            </Text>
                        </HStack>
                    )}
                </VStack>

                {/* Botão para verificar manualmente */}
                <Pressable onPress={checkApiHealth}>
                    {({ pressed }) => (
                        <HStack 
                            gap="$2" 
                            alignItems="center" 
                            justifyContent="center"
                            bg="$primary50"
                            py="$2"
                            px="$3"
                            borderRadius="$md"
                            style={{
                                opacity: pressed ? 0.7 : 1,
                                transform: [{ scale: pressed ? 0.98 : 1 }]
                            }}
                        >
                            <Text fontSize="$xs" color="$primary600">
                                🔄 Verificar novamente
                            </Text>
                        </HStack>
                    )}
                </Pressable>
            </VStack>
        </Box>
    );
};