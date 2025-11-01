import { ScreenHeader } from "@components/screen-header";
import { Text, VStack, HStack, Box, Button, ButtonText, Badge, BadgeText, ButtonIcon } from "@gluestack-ui/themed";
import { ScrollView } from "@gluestack-ui/themed";
import { Plus, Filter, Calendar, MapPin, Package } from "lucide-react-native";
import { useState } from "react";

type AcaoSocial = {
  id: number;
  nome: string;
  descricao: string;
  data: string;
  local: string;
  itensArrecadacao: string[];
  status: 'planejada' | 'em_andamento' | 'concluida' | 'cancelada';
};

export const AcoesListagem = () => {
  const [acoes] = useState<AcaoSocial[]>([
    {
      id: 1,
      nome: "Distribuição de Cestas Básicas - Centro",
      descricao: "Distribuição mensal de cestas básicas para famílias carentes da região central",
      data: "2024-01-20",
      local: "Praça Central",
      itensArrecadacao: ["Arroz", "Feijão", "Óleo", "Açúcar", "Macarrão"],
      status: "planejada"
    },
    {
      id: 2,
      nome: "Campanha do Agasalho - Inverno",
      descricao: "Arrecadação de agasalhos e cobertores para moradores de rua",
      data: "2024-01-18",
      local: "Centro Comunitário da Zona Norte",
      itensArrecadacao: ["Casacos", "Calças", "Cobertores", "Meias", "Luvas"],
      status: "em_andamento"
    },
    {
      id: 3,
      nome: "Ação de Natal - Comunidade Vila Nova",
      descricao: "Distribuição de brinquedos e cestas de natal para crianças carentes",
      data: "2024-01-15",
      local: "CRAS Vila Nova",
      itensArrecadacao: ["Brinquedos", "Roupas infantis", "Doces", "Leite", "Panetone"],
      status: "concluida"
    },
    {
      id: 4,
      nome: "Mutirão de Higiene Pessoal",
      descricao: "Distribuição de kits de higiene para famílias em situação de vulnerabilidade",
      data: "2024-01-22",
      local: "Parque Municipal",
      itensArrecadacao: ["Sabonete", "Shampoo", "Pasta de dente", "Escova dental", "Absorventes"],
      status: "planejada"
    },
    {
      id: 5,
      nome: "Ação Emergencial - Enchente",
      descricao: "Arrecadação emergencial para famílias afetadas pelas enchentes",
      data: "2024-01-12",
      local: "Terminal Rodoviário",
      itensArrecadacao: ["Água mineral", "Alimentos não perecíveis", "Roupas", "Produtos de limpeza"],
      status: "cancelada"
    }
  ]);

  const getStatusConfig = (status: AcaoSocial['status']) => {
    const config = {
      planejada: { color: "$blue", bg: "$blue100", text: "$blue700", label: "Planejada" },
      em_andamento: { color: "$orange", bg: "$orange100", text: "$orange700", label: "Em Andamento" },
      concluida: { color: "$green", bg: "$green100", text: "$green700", label: "Concluída" },
      cancelada: { color: "$red", bg: "$red100", text: "$red700", label: "Cancelada" }
    };
    return config[status];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  // Estatísticas rápidas
  const estatisticas = {
    total: acoes.length,
    planejadas: acoes.filter(a => a.status === 'planejada').length,
    emAndamento: acoes.filter(a => a.status === 'em_andamento').length,
    concluidas: acoes.filter(a => a.status === 'concluida').length
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      bg="$blue100"
      flex={1}
    >
      <ScreenHeader title="Ações Sociais" />
      
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
        {/* Header com Ações */}
        <VStack space="md" mb="$4">
          <HStack justifyContent="space-between" alignItems="flex-start">
            <VStack flex={1}>
              <Text fontSize="$2xl" fontWeight="bold" color="$textDark800">
                Ações Cadastradas
              </Text>
              <Text fontSize="$sm" color="$textDark500">
                {estatisticas.total} ações sociais registradas
              </Text>
            </VStack>
          </HStack>
          
          {/* Botões de Ação */}
          <HStack space="sm">
            <Button 
              size="sm" 
              variant="outline" 
              bg="$white"
              borderColor="$borderLight300"
              flex={1}
            >
              <ButtonIcon as={Filter} size="sm" mr="$1" />
              <ButtonText fontSize="$sm">Filtrar</ButtonText>
            </Button>
            <Button 
              size="sm" 
              bg="$green600"
              flex={1}
            >
              <ButtonIcon as={Plus} size="sm" mr="$1" />
              <ButtonText fontSize="$sm" color="$white">Nova Ação</ButtonText>
            </Button>
          </HStack>
        </VStack>

        {/* Cards de Estatísticas Rápidas */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <HStack space="md" pb="$4">
            <Box bg="$white" p="$4" borderRadius="$xl" minWidth={140} shadow="$1">
              <Text fontSize="$2xl" fontWeight="bold" color="$blue600" textAlign="center">
                {estatisticas.total}
              </Text>
              <Text fontSize="$xs" color="$textDark500" textAlign="center">Total</Text>
            </Box>

            <Box bg="$white" p="$4" borderRadius="$xl" minWidth={140} shadow="$1">
              <Text fontSize="$2xl" fontWeight="bold" color="$blue600" textAlign="center">
                {estatisticas.planejadas}
              </Text>
              <Text fontSize="$xs" color="$textDark500" textAlign="center">Planejadas</Text>
            </Box>

            <Box bg="$white" p="$4" borderRadius="$xl" minWidth={140} shadow="$1">
              <Text fontSize="$2xl" fontWeight="bold" color="$orange600" textAlign="center">
                {estatisticas.emAndamento}
              </Text>
              <Text fontSize="$xs" color="$textDark500" textAlign="center">Em Andamento</Text>
            </Box>

            <Box bg="$white" p="$4" borderRadius="$xl" minWidth={140} shadow="$1">
              <Text fontSize="$2xl" fontWeight="bold" color="$green600" textAlign="center">
                {estatisticas.concluidas}
              </Text>
              <Text fontSize="$xs" color="$textDark500" textAlign="center">Concluídas</Text>
            </Box>
          </HStack>
        </ScrollView>

        {/* Lista de Ações */}
        <VStack space="md">
          {acoes.map((acao) => {
            const statusConfig = getStatusConfig(acao.status);

            return (
              <Box
                key={acao.id}
                bg="$white"
                borderRadius="$2xl"
                p="$4"
                shadow="$1"
                borderLeftWidth="$4"
                borderLeftColor={statusConfig.color + "500"}
              >
                {/* Header com Status */}
                <HStack justifyContent="space-between" alignItems="flex-start" mb="$3">
                  <VStack flex={1} space="xs">
                    <Badge 
                      size="sm" 
                      bg={statusConfig.bg}
                      borderWidth="$1"
                      borderColor={statusConfig.color + "300"}
                      alignSelf="flex-start"
                    >
                      <BadgeText color={statusConfig.text} fontSize="$2xs" fontWeight="bold">
                        {statusConfig.label}
                      </BadgeText>
                    </Badge>
                    
                    <Text fontSize="$lg" fontWeight="bold" color="$textDark800">
                      {acao.nome}
                    </Text>
                    
                    <Text fontSize="$sm" color="$textDark600" numberOfLines={2}>
                      {acao.descricao}
                    </Text>
                  </VStack>
                </HStack>

                {/* Informações da Ação */}
                <VStack space="sm" mb="$3">
                  <HStack alignItems="center" space="sm">
                    <Calendar size={14} color="#6B7280" />
                    <Text fontSize="$sm" color="$textDark500">
                      {formatDate(acao.data)}
                    </Text>
                  </HStack>
                  
                  <HStack alignItems="center" space="sm">
                    <MapPin size={14} color="#6B7280" />
                    <Text fontSize="$sm" color="$textDark500" flex={1}>
                      {acao.local}
                    </Text>
                  </HStack>
                  
                  {/* Itens para Arrecadar */}
                  {acao.itensArrecadacao.length > 0 && (
                    <HStack alignItems="flex-start" space="sm">
                      <Package size={14} color="#6B7280" style={{ marginTop: 2 }} />
                      <VStack flex={1}>
                        <Text fontSize="$sm" color="$textDark500" mb="$1">
                          Itens para arrecadar:
                        </Text>
                        <HStack flexWrap="wrap">
                          {acao.itensArrecadacao.slice(0, 3).map((item, index) => (
                            <Badge 
                              key={index} 
                              size="sm" 
                              variant="outline" 
                              mr="$1" 
                              mb="$1" 
                              bg="$blue50"
                              borderColor="$blue200"
                            >
                              <BadgeText fontSize="$2xs" color="$blue700">
                                {item}
                              </BadgeText>
                            </Badge>
                          ))}
                          {acao.itensArrecadacao.length > 3 && (
                            <Badge size="sm" variant="outline" bg="$gray50" borderColor="$gray200">
                              <BadgeText fontSize="$2xs" color="$gray600">
                                +{acao.itensArrecadacao.length - 3}
                              </BadgeText>
                            </Badge>
                          )}
                        </HStack>
                      </VStack>
                    </HStack>
                  )}
                </VStack>

                {/* Ações */}
                <HStack space="sm">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    bg="$white" 
                    flex={1}
                    borderColor="$blue300"
                  >
                    <ButtonText fontSize="$sm" color="$blue600">Detalhes</ButtonText>
                  </Button>
                  
                  {acao.status !== 'concluida' && acao.status !== 'cancelada' && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      bg="$white" 
                      flex={1}
                      borderColor="$green300"
                    >
                      <ButtonText fontSize="$sm" color="$green600">Editar</ButtonText>
                    </Button>
                  )}
                </HStack>
              </Box>
            );
          })}
        </VStack>

        {/* Mensagem quando não há ações */}
        {acoes.length === 0 && (
          <Box bg="$white" p="$8" borderRadius="$2xl" alignItems="center" shadow="$1">
            <Text fontSize="$lg" color="$textDark400" textAlign="center" mb="$4">
              Nenhuma ação social cadastrada
            </Text>
            <Button bg="$green600">
              <ButtonIcon as={Plus} size="sm" mr="$1" />
              <ButtonText color="$white">Criar Primeira Ação</ButtonText>
            </Button>
          </Box>
        )}
      </VStack>
    </ScrollView>
  );
};