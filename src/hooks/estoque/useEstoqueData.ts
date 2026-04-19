import { useFetchData } from "@hooks/useFetchData"
import { listarItensService } from "@services/estoque";
import { IEstoqueItem } from "@tipagens/estoque";

export const useEstoqueData = () => {
    return useFetchData<IEstoqueItem>({
        fetchFunction: listarItensService
    });
}