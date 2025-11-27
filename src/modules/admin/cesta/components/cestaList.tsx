import { VStack } from "@gluestack-ui/themed";
import { CestaCard } from "./cestaCard";
import { ICesta } from "../types";

interface CestaListProps {
  cestas: ICesta[];
  onDetalhes: (cesta: ICesta) => void;
  onEditar?: (cesta: ICesta) => void;
  onEntregar?: (cesta: ICesta) => void;
}

export const CestaList = ({ cestas, onDetalhes, onEditar, onEntregar }: CestaListProps) => (
  <VStack space="md">
    {cestas.map((cesta) => (
      <CestaCard
        key={cesta.idCesta}
        cesta={cesta}
        onDetalhes={onDetalhes}
        onEditar={onEditar}
        onEntregar={onEntregar}
      />
    ))}
  </VStack>
);