import { ScreenHeader } from "@components/screen-header";
import { Text, VStack, HStack, Box, Button, ButtonText, Badge, BadgeText, Progress, ProgressFilledTrack, ButtonIcon } from "@gluestack-ui/themed";
import { ScrollView } from "@gluestack-ui/themed";
import { Calendar, Users, Package, Truck, DollarSign, TrendingUp, BarChart3, PieChart, Download, Filter, MapPin } from "lucide-react-native";
import { useState } from "react";

// Componente de gráfico de barras simples
const BarChart = ({ data, height = 100, color = "$blue500" }) => {
  const maxValue = Math.max(...data.map(item => item.value));
  
  return (
    <HStack height={height} alignItems="flex-end" justifyContent="space-between" space="sm">
      {data.map((item, index) => (
        <VStack key={index} alignItems="center" flex={1} space="xs">
          <Box
            bg={color}
            width="80%"
            height={`${(item.value / maxValue) * 80}%`}
            borderRadius="$sm"
          />
          <Text fontSize="$2xs" color="$textDark500" textAlign="center">
            {item.label}
          </Text>
        </VStack>
      ))}
    </HStack>
  );
};

export const Relatorio = () => {
  const [periodo, setPeriodo] = useState('mes');

  // Dados mockados
  const estatisticas = {
    totalCestas: 245,
    cestasEntregues: 189,
    cestasPendentes: 32,
    cestasCanceladas: 24,
    valorTotal: 45890.50,
    familiasAtendidas: 156,
    produtoMaisDistribuido: "Arroz",
    cidadeMaisAtendida: "Centro"
  };

  const distribuicaoMensal = [
    { mes: "Jan", cestas: 45 },
    { mes: "Fev", cestas: 52 },
    { mes: "Mar", cestas: 38 },
    { mes: "Abr", cestas: 67 },
    { mes: "Mai", cestas: 58 },
    { mes: "Jun", cestas: 72 }
  ];

  const statusCestas = [
    { status: "Entregues", quantidade: 189, porcentagem: 77, color: "$green500" },
    { status: "Pendentes", quantidade: 32, porcentagem: 13, color: "$orange500" },
    { status: "Preparando", quantidade: 18, porcentagem: 7, color: "$blue500" },
    { status: "Canceladas", quantidade: 6, porcentagem: 3, color: "$red500" }
  ];

  const produtosMaisDistribuidos = [
    { produto: "Arroz", quantidade: 890, color: "$blue400" },
    { produto: "Feijão", quantidade: 756, color: "$green400" },
    { produto: "Açúcar", quantidade: 623, color: "$yellow400" },
    { produto: "Óleo", quantidade: 587, color: "$orange400" },
    { produto: "Macarrão", quantidade: 534, color: "$purple400" }
  ];

  const regioesAtendidas = [
    { regiao: "Centro", quantidade: 89, color: "$blue500" },
    { regiao: "Zona Norte", quantidade: 67, color: "$green500" },
    { regiao: "Zona Sul", quantidade: 45, color: "$orange500" },
    { regiao: "Zona Leste", quantidade: 32, color: "$purple500" },
    { regiao: "Zona Oeste", quantidade: 12, color: "$red500" }
  ];

  const tendenciaMensal = [
    { mes: "Jan", cestas: 45, crescimento: 0 },
    { mes: "Fev", cestas: 52, crescimento: 15 },
    { mes: "Mar", cestas: 38, crescimento: -27 },
    { mes: "Abr", cestas: 67, crescimento: 76 },
    { mes: "Mai", cestas: 58, crescimento: -13 },
    { mes: "Jun", cestas: 72, crescimento: 24 }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      bg="$blue100"
      flex={1}
    >
      <ScreenHeader title="Relatórios e Estatísticas" />
      
      <VStack
        flex={1}
        bg="$backgroundLight50"
        borderTopLeftRadius="$3xl"
        borderTopRightRadius="$3xl"
        px="$4"
        pt="$6"
        pb="$16"
        space="md"
      >
        {/* Header com Filtros - POSIÇÃO ALTERADA */}
        <VStack space="md" mb="$4">
          <HStack justifyContent="space-between" alignItems="flex-start">
            <VStack flex={1}>
              <Text fontSize="$2xl" fontWeight="bold" color="$textDark800">
                Visão Geral
              </Text>
              <Text fontSize="$sm" color="$textDark500">
                Período: Últimos 6 meses
              </Text>
            </VStack>
          </HStack>
          
          {/* Botões em linha própria - POSIÇÃO SEGURA */}
          <HStack justifyContent="flex-end" space="sm">
            <Button 
              size="sm" 
              variant="outline" 
              bg="$white"
              borderColor="$borderLight300"
              minWidth="$20"
            >
              <ButtonIcon as={Filter} size="sm" mr="$1" />
              <ButtonText fontSize="$sm">Filtrar</ButtonText>
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              bg="$white"
              borderColor="$borderLight300"
              minWidth="$20"
            >
              <ButtonIcon as={Download} size="sm" mr="$1" />
              <ButtonText fontSize="$sm">Exportar</ButtonText>
            </Button>
          </HStack>
        </VStack>

        {/* Cards de Estatísticas Principais */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <HStack space="md" pb="$4">
            <Box bg="$white" p="$4" borderRadius="$xl" minWidth={180} shadow="$1">
              <HStack alignItems="center" space="sm" mb="$2">
                <Box bg="$blue100" p="$2" borderRadius="$full">
                  <Package size={20} color="#3B82F6" />
                </Box>
                <Text fontSize="$lg" fontWeight="bold" color="$textDark800">
                  {estatisticas.totalCestas}
                </Text>
              </HStack>
              <Text fontSize="$sm" color="$textDark500">Total de Cestas</Text>
              <Badge size="sm" bg="$green100" mt="$1">
                <BadgeText color="$green700" fontSize="$2xs">+12% vs último período</BadgeText>
              </Badge>
            </Box>

            <Box bg="$white" p="$4" borderRadius="$xl" minWidth={180} shadow="$1">
              <HStack alignItems="center" space="sm" mb="$2">
                <Box bg="$green100" p="$2" borderRadius="$full">
                  <Truck size={20} color="#10B981" />
                </Box>
                <Text fontSize="$lg" fontWeight="bold" color="$textDark800">
                  {estatisticas.cestasEntregues}
                </Text>
              </HStack>
              <Text fontSize="$sm" color="$textDark500">Cestas Entregues</Text>
              <Progress value={77} size="sm" bg="$backgroundLight200" mt="$1">
                <ProgressFilledTrack bg="$green500" />
              </Progress>
            </Box>

            <Box bg="$white" p="$4" borderRadius="$xl" minWidth={180} shadow="$1">
              <HStack alignItems="center" space="sm" mb="$2">
                <Box bg="$orange100" p="$2" borderRadius="$full">
                  <Users size={20} color="#F59E0B" />
                </Box>
                <Text fontSize="$lg" fontWeight="bold" color="$textDark800">
                  {estatisticas.familiasAtendidas}
                </Text>
              </HStack>
              <Text fontSize="$sm" color="$textDark500">Famílias Atendidas</Text>
              <Badge size="sm" bg="$blue100" mt="$1">
                <BadgeText color="$blue700" fontSize="$2xs">+8 novas famílias</BadgeText>
              </Badge>
            </Box>

            <Box bg="$white" p="$4" borderRadius="$xl" minWidth={180} shadow="$1">
              <HStack alignItems="center" space="sm" mb="$2">
                <Box bg="$purple100" p="$2" borderRadius="$full">
                  <DollarSign size={20} color="#8B5CF6" />
                </Box>
                <Text fontSize="$lg" fontWeight="bold" color="$textDark800">
                  {formatCurrency(estatisticas.valorTotal)}
                </Text>
              </HStack>
              <Text fontSize="$sm" color="$textDark500">Valor Total Distribuído</Text>
              <Text fontSize="$xs" color="$textDark400">Custo médio por cesta: R$ 187,30</Text>
            </Box>
          </HStack>
        </ScrollView>

        {/* Gráficos em Grid */}
        <HStack space="md" flexWrap="wrap">
          {/* Distribuição Mensal */}
          <Box bg="$white" p="$4" borderRadius="$xl" flex={1} minWidth={300} shadow="$1" mb="$4">
            <HStack alignItems="center" space="sm" mb="$4">
              <BarChart3 size={18} color="#6B7280" />
              <Text fontSize="$lg" fontWeight="bold" color="$textDark800">
                Distribuição Mensal
              </Text>
            </HStack>
            <BarChart data={distribuicaoMensal.map(item => ({ label: item.mes, value: item.cestas }))} />
          </Box>

          {/* Status das Cestas */}
          <Box bg="$white" p="$4" borderRadius="$xl" flex={1} minWidth={300} shadow="$1" mb="$4">
            <HStack alignItems="center" space="sm" mb="$4">
              <PieChart size={18} color="#6B7280" />
              <Text fontSize="$lg" fontWeight="bold" color="$textDark800">
                Status das Cestas
              </Text>
            </HStack>
            <VStack>
              {statusCestas.map((item, index) => (
                <HStack key={index} alignItems="center" space="sm" mb="$2">
                  <Box width="$3" height="$3" borderRadius="$full" bg={item.color} />
                  <Text fontSize="$sm" flex={1}>{item.status}</Text>
                  <Text fontSize="$sm" fontWeight="bold" color="$textDark700">{item.quantidade}</Text>
                  <Text fontSize="$sm" color="$textDark500">({item.porcentagem}%)</Text>
                </HStack>
              ))}
            </VStack>
          </Box>
        </HStack>

        {/* Produtos Mais Distribuídos */}
        <Box bg="$white" p="$4" borderRadius="$xl" shadow="$1" mb="$4">
          <HStack alignItems="center" space="sm" mb="$4">
            <Package size={18} color="#6B7280" />
            <Text fontSize="$lg" fontWeight="bold" color="$textDark800">
              Produtos Mais Distribuídos
            </Text>
          </HStack>
          <VStack space="sm">
            {produtosMaisDistribuidos.map((item, index) => (
              <VStack key={index} space="xs">
                <HStack justifyContent="space-between" alignItems="center">
                  <Text fontSize="$sm" color="$textDark700">{item.produto}</Text>
                  <Text fontSize="$sm" fontWeight="bold" color="$textDark800">{item.quantidade} unidades</Text>
                </HStack>
                <Progress value={(item.quantidade / 890) * 100} size="sm" bg="$backgroundLight200">
                  <ProgressFilledTrack bg={item.color} />
                </Progress>
              </VStack>
            ))}
          </VStack>
        </Box>

        {/* Regiões Atendidas e Tendência */}
        <HStack space="md" flexWrap="wrap">
          {/* Regiões Atendidas */}
          <Box bg="$white" p="$4" borderRadius="$xl" flex={1} minWidth={200} shadow="$1" mb="$4">
            <HStack alignItems="center" space="sm" mb="$4">
              <MapPin size={18} color="#6B7280" />
              <Text fontSize="$lg" fontWeight="bold" color="$textDark800">
                Regiões Atendidas
              </Text>
            </HStack>
            <VStack>
              {regioesAtendidas.map((item, index) => (
                <HStack key={index} alignItems="center" space="sm" mb="$2">
                  <Box width="$3" height="$3" borderRadius="$full" bg={item.color} />
                  <Text fontSize="$sm" flex={1}>{item.regiao}</Text>
                  <Text fontSize="$sm" fontWeight="bold" color="$textDark700">{item.quantidade}</Text>
                </HStack>
              ))}
            </VStack>
          </Box>

          {/* Tendência Mensal */}
          <Box bg="$white" p="$4" borderRadius="$xl" flex={1} minWidth={200} shadow="$1" mb="$4">
            <HStack alignItems="center" space="sm" mb="$4">
              <TrendingUp size={18} color="#6B7280" />
              <Text fontSize="$lg" fontWeight="bold" color="$textDark800">
                Tendência Mensal
              </Text>
            </HStack>
            <VStack>
              {tendenciaMensal.map((item, index) => {
                const crescimentoColor = item.crescimento > 0 ? "$green500" : item.crescimento < 0 ? "$red500" : "$gray500";
                return (
                  <HStack key={index} alignItems="center" space="sm" mb="$2">
                    <Text fontSize="$sm" flex={1} color="$textDark700">{item.mes}</Text>
                    <Text fontSize="$sm" fontWeight="bold" color="$textDark800">{item.cestas}</Text>
                    <Text fontSize="$xs" color={crescimentoColor}>
                      {item.crescimento > 0 ? '+' : ''}{item.crescimento}%
                    </Text>
                  </HStack>
                );
              })}
            </VStack>
          </Box>
        </HStack>

        {/* Insights e Recomendações */}
        <Box bg="$blue50" p="$4" borderRadius="$xl" borderLeftWidth="$4" borderLeftColor="$blue500">
          <Text fontSize="$lg" fontWeight="bold" color="$blue800" mb="$2">
            📊 Insights do Período
          </Text>
          <VStack space="sm">
            <Text fontSize="$sm" color="$blue700">
              • Aumento de 24% nas distribuições no último mês
            </Text>
            <Text fontSize="$sm" color="$blue700">
              • Região Centro concentra 36% das entregas
            </Text>
            <Text fontSize="$sm" color="$blue700">
              • Arroz é o produto mais distribuído (890 unidades)
            </Text>
            <Text fontSize="$sm" color="$blue700">
              • Taxa de entrega: 77% das cestas foram entregues
            </Text>
          </VStack>
        </Box>
      </VStack>
    </ScrollView>
  );
};