import { FlatList, VStack } from "@gluestack-ui/themed";
import { CestaCard } from "./cestaCard";
import { ICesta } from "@tipagens/cesta";
import { EmptyStateLottie } from "@components/index";
import { useEmptyStateConfig } from "@hooks/useEmptyStateConfig";
import { Pagination } from "@components/pagination";
import { paginationArgs } from "@utils/constantes";

interface CestaListProps {
  cestas: ICesta[];
  onDetalhes: (cesta: ICesta) => void;
  onCancelar: (idCesta: number) => void;
  onEntregar: (idCesta: number) => void;
  pagination: any;
  onChangePage: (page: number) => void;
}

export const CestaList = ({ cestas, pagination, onDetalhes, onCancelar, onEntregar, onChangePage }: CestaListProps) => {
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
            onCancelar={onCancelar}
            onEntregar={onEntregar}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120, paddingTop: 16 }}
        ListEmptyComponent={
          <EmptyStateLottie
            animationSource={EMPTY_STATE_CONFIG.animation}
            title="Nenhuma Cesta Encontrada"
            description={""}
          />
        }
        ListFooterComponent={
          pagination.totalItens > paginationArgs.ITEMS_PER_PAGE ? (
              <Pagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  totalItems={pagination.totalItens}
                  itemsPerPage={pagination.itemsPerPage}
                  onPageChange={onChangePage}
                  onItemsPerPageChange={() => {}}
                  showItemsPerPage={false}
                  showFirstLastButtons={true}
                  showTotalItems={true}
              />
          ) : null
      }
      />
    </VStack>
  )
} 