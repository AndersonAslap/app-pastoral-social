import { FlatList, VStack } from "@gluestack-ui/themed";
import { CestaCard } from "./cestaCard";
import { ICesta } from "../types";
import { EmptyStateLottie } from "@shared/components";
import { useEmptyStateConfig } from "@hooks/useEmptyStateConfig";

interface CestaListProps {
  cestas: ICesta[];
  onDetalhes: (cesta: ICesta) => void;
  onEditar?: (cesta: ICesta) => void;
  onEntregar?: (cesta: ICesta) => void;
}

export const CestaList = ({ cestas, onDetalhes, onEditar, onEntregar }: CestaListProps) => {
  const EMPTY_STATE_CONFIG = useEmptyStateConfig('cesta');

  return (
    <VStack space="md">
      <FlatList
        data={cestas}
        keyExtractor={(item) => (item as ICesta).idCesta.toString()}
        renderItem={({ item }) => (
          <CestaCard
            key={item.idCesta}
            cesta={item}
            onDetalhes={onDetalhes}
            onEditar={onEditar}
            onEntregar={onEntregar}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120, paddingTop: 16 }}
        ListEmptyComponent={
          <EmptyStateLottie
            animationSource={EMPTY_STATE_CONFIG.animation}
            title={EMPTY_STATE_CONFIG.title}
            description={EMPTY_STATE_CONFIG.description}
          />
        }
      />
    </VStack>
  )
} 