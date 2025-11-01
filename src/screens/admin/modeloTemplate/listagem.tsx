import { FilterList } from "@components/filter-list";
import { ScreenHeader } from "@components/screen-header";
import { FlatList, Button, ButtonText, ButtonIcon, Badge, BadgeText } from "@gluestack-ui/themed";
import { View, VStack, HStack, Box, Text } from "@gluestack-ui/themed";
import { useCallback, useState } from "react";
import { HeaderList } from "@components/header-list";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { Eye, Package, Plus, Filter } from "lucide-react-native";
import { listarTemplates } from "@services/template.service";
import { MESSAGES_ERROR } from "@utils/constantes";
import { AppError } from "@utils/app.error";
import { gerarCestaService } from "@services/cesta.service";

type ItemCesta = {
  nome: string;
  quantidade: number;
}

type ModeloCesta = {
  idTemplate: number;
  descricao: string;
  qtdPossivelGeracao: number;
  items: ItemCesta[];
}

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
            bg="$blue600"
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
                    {item.quantidade}
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

  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<ModeloCesta[]>([]);
  const [error, setError] = useState({
    isError: false,
    message: ""
  });

  const handleRedirectToModeloTemplateCadastrar = () => {
    navigator.navigate("modeloTemplateCadastrar");
  }

  const handleDetalhes = (modelo: ModeloCesta) => {
    setModeloSelecionado(modelo);
    setIsDetalhesOpen(true);
  }

  const handleGerarCestas = async (modelo: ModeloCesta) => {
    try {
      setIsLoading(true);
      await gerarCestaService({idTemplate: modelo.idTemplate});
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : MESSAGES_ERROR.FETCH_ITENS;
      setError({ isError: true, message: title });
    } finally {
      setIsLoading(false);
    }
  }

  const handleCloseDetalhes = () => {
    setIsDetalhesOpen(false);
    setModeloSelecionado(null);
  }

  
  
  const fetchItens = async () => {
    try {
      setIsLoading(true);
      const data = await listarTemplates();
      setItems(data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : MESSAGES_ERROR.FETCH_ITENS;
      setError({ isError: true, message: title });
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchItens();
    }, [])
  );

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
          data={items}
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