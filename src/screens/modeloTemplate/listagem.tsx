import { FilterList } from "@components/filter-list";
import { ScreenHeader } from "@components/screen-header";
import { FlatList, Button, ButtonText, ButtonIcon, Badge, BadgeText } from "@gluestack-ui/themed";
import { View, VStack, HStack, Box, Text } from "@gluestack-ui/themed";
import { useState } from "react";
import { HeaderList } from "@components/header-list";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { Eye, Package, Plus, Filter } from "lucide-react-native";

type ItemCesta = {
  nome: string;
  valor: number;
  medida: string;
}

type ModeloCesta = {
  idTemplate: number;
  descricao: string;
  qtdPossivelGeracao: number;
  items: ItemCesta[];
}

// Dados mockados
const modelosCesta: ModeloCesta[] = [
  {
    idTemplate: 1,
    descricao: "Cesta Básica Familiar",
    qtdPossivelGeracao: 5,
    items: [
      { nome: "Arroz", valor: 5, medida: "kg" },
      { nome: "Feijão", valor: 2, medida: "kg" },
      { nome: "Açúcar", valor: 2, medida: "kg" },
      { nome: "Óleo", valor: 1, medida: "L" },
      { nome: "Macarrão", valor: 2, medida: "kg" }
    ]
  },
  {
    idTemplate: 2,
    descricao: "Cesta Emergencial",
    qtdPossivelGeracao: 0,
    items: [
      { nome: "Arroz", valor: 2, medida: "kg" },
      { nome: "Feijão", valor: 1, medida: "kg" },
      { nome: "Óleo", valor: 1, medida: "L" },
      { nome: "Sal", valor: 1, medida: "kg" }
    ]
  },
  {
    idTemplate: 3,
    descricao: "Cesta com Produtos de Higiene",
    qtdPossivelGeracao: 3,
    items: [
      { nome: "Sabonete", valor: 4, medida: "un" },
      { nome: "Shampoo", valor: 2, medida: "un" },
      { nome: "Pasta de Dente", valor: 2, medida: "un" },
      { nome: "Papel Higiênico", valor: 4, medida: "un" }
    ]
  },
  {
    idTemplate: 4,
    descricao: "Cesta para Idosos",
    qtdPossivelGeracao: 8,
    items: [
      { nome: "Arroz", valor: 3, medida: "kg" },
      { nome: "Feijão", valor: 1, medida: "kg" },
      { nome: "Farinha", valor: 1, medida: "kg" },
      { nome: "Leite", valor: 6, medida: "L" },
      { nome: "Biscoito", valor: 2, medida: "pacotes" }
    ]
  }
];

// Componente do Card do Modelo de Cesta
const ModeloCestaCard = ({ item, onPressDetalhes, onPressGerar }: { 
  item: ModeloCesta; 
  onPressDetalhes: () => void;
  onPressGerar: () => void;
}) => {
  return (
    <Box
      bg="$white"
      borderRadius="$2xl"
      p="$4"
      mb="$3"
      shadow="$1"
      borderLeftWidth="$4"
      borderLeftColor={item.qtdPossivelGeracao > 0 ? "$green500" : "$red500"}
    >
      {/* Header */}
      <HStack justifyContent="space-between" alignItems="flex-start" mb="$3">
        <VStack flex={1} space="xs">
          <HStack alignItems="center" space="sm">
            <Package size={18} color="#3B82F6" />
            <Text fontSize="$lg" fontWeight="bold" color="$textDark800" flex={1}>
              {item.descricao}
            </Text>
          </HStack>
          
          <Text fontSize="$sm" color="$textDark600">
            {item.items.length} itens no modelo
          </Text>
        </VStack>

        {/* Badge de Geração Possível */}
        <Badge 
          size="md" 
          bg={item.qtdPossivelGeracao > 0 ? "$green100" : "$red100"}
          borderWidth="$1"
          borderColor={item.qtdPossivelGeracao > 0 ? "$green300" : "$red300"}
        >
          <BadgeText 
            color={item.qtdPossivelGeracao > 0 ? "$green700" : "$red700"} 
            fontSize="$2xs" 
            fontWeight="bold"
          >
            {item.qtdPossivelGeracao > 0 ? `${item.qtdPossivelGeracao} cestas possíveis` : "Sem estoque"}
          </BadgeText>
        </Badge>
      </HStack>

      {/* Preview dos Itens */}
      <Box bg="$backgroundLight50" p="$3" borderRadius="$lg" mb="$3">
        <Text fontSize="$sm" fontWeight="medium" color="$textDark600" mb="$2">
          Itens incluídos:
        </Text>
        <HStack flexWrap="wrap">
          {item.items.slice(0, 3).map((produto, index) => (
            <Badge 
              key={index} 
              size="sm" 
              variant="outline" 
              mr="$1" 
              mb="$1" 
              bg="$white"
              borderColor="$blue200"
            >
              <BadgeText fontSize="$2xs" color="$blue700">
                {produto.nome} ({produto.valor}{produto.medida})
              </BadgeText>
            </Badge>
          ))}
          {item.items.length > 3 && (
            <Badge size="sm" variant="outline" bg="$white" borderColor="$gray200">
              <BadgeText fontSize="$2xs" color="$gray600">
                +{item.items.length - 3}
              </BadgeText>
            </Badge>
          )}
        </HStack>
      </Box>

      {/* Botões de Ação */}
      <HStack space="sm">
        <Button 
          size="sm" 
          variant="outline" 
          bg="$white" 
          flex={1}
          borderColor="$blue300"
          onPress={onPressDetalhes}
        >
          <ButtonIcon as={Eye} size="sm" mr="$1" />
          <ButtonText fontSize="$sm" color="$blue600">Detalhes</ButtonText>
        </Button>
        
        {item.qtdPossivelGeracao > 0 && (
          <Button 
            size="sm" 
            bg="$green600"
            flex={1}
            onPress={onPressGerar}
          >
            <ButtonText fontSize="$sm" color="$white">Gerar Cestas</ButtonText>
          </Button>
        )}
      </HStack>
    </Box>
  );
};

// Drawer de Detalhes
const DetalhesModeloDrawer = ({ 
  isOpen, 
  onClose, 
  modelo 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  modelo: ModeloCesta | null;
}) => {
  if (!modelo) return null;

  return (
    <FilterList
      onFilterOpen={isOpen}
      onSetIsFilterOpen={onClose}
      title="Detalhes do Modelo"
    >
      <VStack space="md">
        <Box bg="$blue50" p="$4" borderRadius="$lg" borderLeftWidth="$4" borderLeftColor="$blue500">
          <Text fontSize="$xl" fontWeight="bold" color="$blue800" mb="$2">
            {modelo.descricao}
          </Text>
          <Text fontSize="$sm" color="$blue600">
            {modelo.items.length} itens • {modelo.qtdPossivelGeracao} cestas possíveis
          </Text>
        </Box>

        <Box bg="$white" p="$4" borderRadius="$lg" shadow="$1">
          <Text fontSize="$lg" fontWeight="bold" color="$textDark800" mb="$3">
            Itens da Cesta
          </Text>
          <VStack space="sm">
            {modelo.items.map((item, index) => (
              <HStack 
                key={index} 
                justifyContent="space-between" 
                alignItems="center" 
                bg="$backgroundLight50" 
                p="$3" 
                borderRadius="$md"
              >
                <Text fontSize="$sm" color="$textDark700" fontWeight="medium">
                  {item.nome}
                </Text>
                <Badge size="sm" bg="$blue100">
                  <BadgeText color="$blue700" fontSize="$2xs" fontWeight="bold">
                    {item.valor} {item.medida}
                  </BadgeText>
                </Badge>
              </HStack>
            ))}
          </VStack>
        </Box>

        <Box bg="$green50" p="$4" borderRadius="$lg" borderLeftWidth="$4" borderLeftColor="$green500">
          <Text fontSize="$md" fontWeight="bold" color="$green800" mb="$1">
            Status de Geração
          </Text>
          <Text fontSize="$sm" color="$green700">
            {modelo.qtdPossivelGeracao > 0 
              ? `É possível gerar ${modelo.qtdPossivelGeracao} cestas com o estoque atual`
              : "Não é possível gerar cestas - estoque insuficiente"
            }
          </Text>
        </Box>

        <Button onPress={onClose} bg="$blue600" mt="$2">
          <ButtonText color="$white">Fechar</ButtonText>
        </Button>
      </VStack>
    </FilterList>
  );
};

const ModeloTemplateListagem: React.FC = () => {
  const navigator = useNavigation<AppNavigatorRoutesProps>();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDetalhesOpen, setIsDetalhesOpen] = useState(false);
  const [modeloSelecionado, setModeloSelecionado] = useState<ModeloCesta | null>(null);

  const handleRedirectToModeloTemplateCadastrar = () => {
    navigator.navigate("modeloTemplateCadastrar");
  }

  const handleDetalhes = (modelo: ModeloCesta) => {
    setModeloSelecionado(modelo);
    setIsDetalhesOpen(true);
  }

  const handleGerarCestas = (modelo: ModeloCesta) => {
    // Navegar para tela de geração de cestas ou abrir modal
    console.log("Gerar cestas para:", modelo.descricao);
    // navigator.navigate("gerarCestas", { modeloId: modelo.idTemplate });
  }

  const handleCloseDetalhes = () => {
    setIsDetalhesOpen(false);
    setModeloSelecionado(null);
  }

  return (
    <View flex={1} bg="$blue100">
      <ScreenHeader title="Modelos de Cesta" />
      <VStack
        flex={1}
        bg="$backgroundLight0"
        borderTopLeftRadius="$3xl"
        borderTopRightRadius="$3xl"
        px="$4"
        pt="$8"
      >
        {/* Header com Botões */}
        <HeaderList
          labelButtonPlus="Novo modelo"
          onSetShowFilter={setIsFilterOpen}
          showIconFilter
          onPress={handleRedirectToModeloTemplateCadastrar}
        />

        {/* Lista de Modelos de Cesta */}
        <FlatList
          data={modelosCesta}
          keyExtractor={(item) => item.idTemplate.toString()}
          renderItem={({ item }) => (
            <ModeloCestaCard 
              item={item} 
              onPressDetalhes={() => handleDetalhes(item)}
              onPressGerar={() => handleGerarCestas(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 16, paddingTop: 16 }}
        />

        {/* Drawer de Filtros */}
        <FilterList
          onFilterOpen={isFilterOpen}
          onSetIsFilterOpen={setIsFilterOpen}
        >
          <View />
        </FilterList>

        {/* Drawer de Detalhes */}
        <DetalhesModeloDrawer 
          isOpen={isDetalhesOpen}
          onClose={handleCloseDetalhes}
          modelo={modeloSelecionado}
        />
      </VStack>
    </View>
  )
}

export default ModeloTemplateListagem;