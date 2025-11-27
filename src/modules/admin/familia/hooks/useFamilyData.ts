import { useFetchData } from "@shared/hooks/useFetchData";
import { IResponseListarFamilias } from "../../../../@shared/types/responses";
import { listarFamiliaService } from "../services";

export const useFamiliaData = () => {
    return useFetchData<IResponseListarFamilias>({
        fetchFunction: listarFamiliaService
    });
};