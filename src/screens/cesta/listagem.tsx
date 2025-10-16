import { ScreenHeader } from "@components/screen-header";
import { Text, VStack, HStack, Box, Button, ButtonText, Badge, BadgeText, Progress, ProgressFilledTrack } from "@gluestack-ui/themed";
import { ScrollView } from "@gluestack-ui/themed";
import { Calendar, MapPin, Users, Package, Clock, CheckCircle, AlertTriangle, Truck, Edit, Eye } from "lucide-react-native";
import { useState } from "react";

type Cesta = {
  id: number;
  codigo: string;
  status: 'pendente' | 'preparando' | 'pronta' | 'entregue' | 'cancelada';
  dataCriacao: string;
  dataEntrega: string;
  destinatario: string;
  endereco: string;
  quantidadeItens: number;
  pesoTotal: number;
  prioridade: 'baixa' | 'media' | 'alta' | 'urgente';
  produtos: {
    nome: string;
    quantidade: number;
    unidade: string;
  }[];
};

export const CestaListagem = () => {
  const [cestas] = useState<Cesta[]>([
    {
      id: 1,
      codigo: "CB-2024-001",
      status: "pronta",
      dataCriacao: "2024-01-15",
      dataEntrega: "2024-01-20",
      destinatario: "Maria Silva Santos",
      endereco: "Rua das Flores, 123 - Centro",
      quantidadeItens: 12,
      pesoTotal: 18.5,
      prioridade: "media",
      produtos: [
        { nome: "Arroz", quantidade: 5, unidade: "kg" },
        { nome: "Feijão", quantidade: 2, unidade: "kg" },
        { nome: "Açúcar", quantidade: 2, unidade: "kg" },
        { nome: "Óleo", quantidade: 1, unidade: "L" },
        { nome: "Macarrão", quantidade: 2, unidade: "kg" },
      ]
    },
    {
      id: 2,
      codigo: "CB-2024-002",
      status: "preparando",
      dataCriacao: "2024-01-16",
      dataEntrega: "2024-01-18",
      destinatario: "João Pereira Oliveira",
      endereco: "Av. Principal, 456 - Jardim",
      quantidadeItens: 10,
      pesoTotal: 15.2,
      prioridade: "alta",
      produtos: [
        { nome: "Arroz", quantidade: 3, unidade: "kg" },
        { nome: "Feijão", quantidade: 1, unidade: "kg" },
        { nome: "Farinha", quantidade: 2, unidade: "kg" },
        { nome: "Leite", quantidade: 4, unidade: "L" },
      ]
    },
    {
      id: 3,
      codigo: "CB-2024-003",
      status: "pendente",
      dataCriacao: "2024-01-17",
      dataEntrega: "2024-01-25",
      destinatario: "Ana Costa Rodrigues",
      endereco: "Travessa da Paz, 789 - Vila Nova",
      quantidadeItens: 8,
      pesoTotal: 12.8,
      prioridade: "baixa",
      produtos: [
        { nome: "Arroz", quantidade: 2, unidade: "kg" },
        { nome: "Feijão", quantidade: 1, unidade: "kg" },
        { nome: "Café", quantidade: 1, unidade: "kg" },
        { nome: "Óleo", quantidade: 1, unidade: "L" },
      ]
    },
    {
      id: 4,
      codigo: "CB-2024-004",
      status: "entregue",
      dataCriacao: "2024-01-10",
      dataEntrega: "2024-01-12",
      destinatario: "Pedro Almeida Souza",
      endereco: "Rua das Palmeiras, 321 - Centro",
      quantidadeItens: 15,
      pesoTotal: 22.1,
      prioridade: "media",
      produtos: [
        { nome: "Arroz", quantidade: 4, unidade: "kg" },
        { nome: "Feijão", quantidade: 2, unidade: "kg" },
        { nome: "Açúcar", quantidade: 2, unidade: "kg" },
        { nome: "Sal", quantidade: 1, unidade: "kg" },
        { nome: "Macarrão", quantidade: 3, unidade: "kg" },
        { nome: "Óleo", quantidade: 2, unidade: "L" },
      ]
    },
    {
      id: 5,
      codigo: "CB-2024-005",
      status: "cancelada",
      dataCriacao: "2024-01-14",
      dataEntrega: "2024-01-16",
      destinatario: "Carla Mendes Lima",
      endereco: "Alameda dos Anjos, 654 - Parque",
      quantidadeItens: 11,
      pesoTotal: 16.7,
      prioridade: "urgente",
      produtos: [
        { nome: "Arroz", quantidade: 3, unidade: "kg" },
        { nome: "Feijão", quantidade: 2, unidade: "kg" },
        { nome: "Farinha", quantidade: 2, unidade: "kg" },
        { nome: "Leite", quantidade: 4, unidade: "L" },
      ]
    }
  ]);

  const getStatusConfig = (status: Cesta['status']) => {
    const config = {
      pendente: { color: "$orange", bg: "$orange100", text: "$orange700", iconColor: "orange", icon: Clock, label: "Pendente" },
      preparando: { color: "$blue", bg: "$blue100", text: "$blue700", iconColor: "blue", icon: Package, label: "Preparando" },
      pronta: { color: "$green", bg: "$green100", text: "$green700", iconColor: "green", icon: CheckCircle, label: "Pronta" },
      entregue: { color: "$purple", bg: "$purple100", text: "$purple700", iconColor: "purple", icon: Truck, label: "Entregue" },
      cancelada: { color: "$red", bg: "$red100", text: "$red700", iconColor: "red", icon: AlertTriangle, label: "Cancelada" }
    };
    return config[status];
  };

  const getPrioridadeConfig = (prioridade: Cesta['prioridade']) => {
    const config = {
      baixa: { color: "$green", label: "Baixa" },
      media: { color: "$blue", label: "Média" },
      alta: { color: "$orange", label: "Alta" },
      urgente: { color: "$red", label: "Urgente" }
    };
    return config[prioridade];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const getProgressValue = (status: Cesta['status']) => {
    const progress = {
      pendente: 25,
      preparando: 50,
      pronta: 75,
      entregue: 100,
      cancelada: 0
    };
    return progress[status];
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      bg="$blue100"
      flex={1}
    >
      <ScreenHeader title="Cestas Básicas" />
      
      <VStack
        flex={1}
        bg="$backgroundLight50"
        borderTopLeftRadius="$3xl"
        borderTopRightRadius="$3xl"
        px="$4"
        pt="$6"
        pb="$16"
      >
        {/* Header Stats */}
        <HStack space="md" mb="$6">
          <Box flex={1} bg="$blue50" p="$4" borderRadius="$xl" borderLeftWidth="$4" borderLeftColor="$blue500">
            <Text fontSize="$2xl" fontWeight="bold" color="$blue800">{cestas.length}</Text>
            <Text fontSize="$sm" color="$blue600">Total de Cestas</Text>
          </Box>
          <Box flex={1} bg="$green50" p="$4" borderRadius="$xl" borderLeftWidth="$4" borderLeftColor="$green500">
            <Text fontSize="$2xl" fontWeight="bold" color="$green800">
              {cestas.filter(c => c.status === 'entregue').length}
            </Text>
            <Text fontSize="$sm" color="$green600">Entregues</Text>
          </Box>
        </HStack>

        {/* Filtros Rápidos */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} mb="$4">
          <HStack space="sm" pb="$2">
            <Button size="sm" variant="outline" bg="$white">
              <ButtonText>Todas</ButtonText>
            </Button>
            <Button size="sm" variant="outline" bg="$white">
              <ButtonText>Pendentes</ButtonText>
            </Button>
            <Button size="sm" variant="outline" bg="$white">
              <ButtonText>Preparando</ButtonText>
            </Button>
            <Button size="sm" variant="outline" bg="$white">
              <ButtonText>Prontas</ButtonText>
            </Button>
            <Button size="sm" variant="outline" bg="$white">
              <ButtonText>Entregues</ButtonText>
            </Button>
          </HStack>
        </ScrollView>

        {/* Lista de Cestas */}
        <VStack space="md">
          {cestas.map((cesta) => {
            const statusConfig = getStatusConfig(cesta.status);
            const prioridadeConfig = getPrioridadeConfig(cesta.prioridade);
            const StatusIcon = statusConfig.icon;
            const progressValue = getProgressValue(cesta.status);

            return (
              <Box
                key={cesta.id}
                bg="$white"
                borderRadius="$2xl"
                p="$4"
                shadow="$1"
                borderLeftWidth="$4"
                borderLeftColor={statusConfig.color + "500"}
              >
                {/* Header */}
                <HStack alignItems="flex-start" mb="$3">
                  <VStack flex={1}>
                    <HStack alignItems="center" justifyContent="space-between"  space="sm" mb="$1">
                      <Text fontSize="$lg" fontWeight="bold" color="$textDark800">
                        {cesta.codigo}
                      </Text>
                      <Badge 
                        size="sm" 
                        bg={statusConfig.bg}
                        borderWidth="$1"
                        borderColor={statusConfig.color + "300"}
                      >
                        <StatusIcon size={12} color={statusConfig.iconColor} />
                        <BadgeText color={statusConfig.text} ml="$1" fontSize="$2xs" fontWeight="bold">
                          {statusConfig.label}
                        </BadgeText>
                      </Badge>
                    </HStack>
                  </VStack>
                </HStack>

                {/* Progress Bar */}
                <Box mb="$3">
                  <HStack justifyContent="space-between" mb="$1">
                    <Text fontSize="$xs" color="$textDark500">Progresso</Text>
                    <Text fontSize="$xs" color="$textDark500" fontWeight="bold">{progressValue}%</Text>
                  </HStack>
                  <Progress value={progressValue} size="sm" bg="$backgroundLight200">
                    <ProgressFilledTrack bg={statusConfig.color + "500"} />
                  </Progress>
                </Box>

                {/* Produtos */}
                <Box bg="$backgroundLight50" p="$3" borderRadius="$lg" mb="$3">
                  <HStack alignItems="center" mb="$2">
                    <Package size={14} color="#6B7280" />
                    <Text fontSize="$sm" fontWeight="medium" color="$textDark600" ml="$1">
                      {cesta.quantidadeItens} itens
                    </Text>
                  </HStack>
                  
                  <HStack flexWrap="wrap">
                    {cesta.produtos.slice(0, 3).map((produto, index) => (
                      <Badge key={index} size="sm" variant="outline" mr="$1" mb="$1" bg="$white">
                        <BadgeText fontSize="$2xs" color="$textDark600">
                          {produto.nome} ({produto.quantidade}{produto.unidade})
                        </BadgeText>
                      </Badge>
                    ))}
                    {cesta.produtos.length > 3 && (
                      <Badge size="sm" variant="outline" bg="$white">
                        <BadgeText fontSize="$2xs" color="$textDark500">
                          +{cesta.produtos.length - 3}
                        </BadgeText>
                      </Badge>
                    )}
                  </HStack>
                </Box>

                {/* Ações */}
                <HStack space="sm">
                  <Button flex={1} size="sm" variant="outline" bg="$white">
                    <Eye size={14} color="#6B7280" />
                    <ButtonText color="$textDark600" ml="$1">Detalhes</ButtonText>
                  </Button>
                  
                  {cesta.status !== 'entregue' && cesta.status !== 'cancelada' && (
                    <Button flex={1} size="sm" variant="outline" bg="$white">
                      <Edit size={14} color="#6B7280" />
                      <ButtonText color="$textDark600" ml="$1">Editar</ButtonText>
                    </Button>
                  )}
                  
                  {cesta.status === 'pronta' && (
                    <Button flex={1} size="sm" bg="$green600">
                      <Truck size={14} color="white" />
                      <ButtonText color="white" ml="$1">Entregar</ButtonText>
                    </Button>
                  )}
                </HStack>
              </Box>
            );
          })}
        </VStack>
      </VStack>
    </ScrollView>
  );
};