import { useFetchData } from "@hooks/useFetchData"
import { listarItensService } from "../services";
import { IEstoqueItem } from "../types";

export const useEstoqueData = () => {
    return useFetchData<IEstoqueItem>({
        fetchFunction: listarItensService
    });
}