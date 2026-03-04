import { FlatList, VStack } from "@gluestack-ui/themed";
import { ModeloTemplateCestaCard } from "./modeloTemplateCestaCard";
import { ModeloTemplateCesta } from "../types";
import { EmptyStateLottie } from "@shared/components";
import { useEmptyStateConfig } from "@hooks/useEmptyStateConfig";

interface ModeloListProps {
  items: ModeloTemplateCesta[];
  isGerandoCesta: boolean;
  onDetalhes: (modelo: ModeloTemplateCesta) => void;
  onGerarCestas: (modelo: ModeloTemplateCesta) => void;
}

export const ModeloTemplateList = ({ 
  items, 
  isGerandoCesta, 
  onDetalhes, 
  onGerarCestas 
}: ModeloListProps) => {

  const EMPTY_STATE_CONFIG = useEmptyStateConfig('modelo');

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => (item as ModeloTemplateCesta).idTemplate.toString()}
      renderItem={({ item }) => (
        <ModeloTemplateCestaCard
          item={item as ModeloTemplateCesta}
          isGerandoCesta={isGerandoCesta}
          onPressDetalhes={() => onDetalhes(item as ModeloTemplateCesta)}
          onPressGerar={() => onGerarCestas(item as ModeloTemplateCesta)}
        />
      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 16, paddingTop: 16 }}
      ListEmptyComponent={
        <EmptyStateLottie
          animationSource={EMPTY_STATE_CONFIG.animation}
          title={EMPTY_STATE_CONFIG.title}
          description={EMPTY_STATE_CONFIG.description}
        />
      }
    />
  );
};