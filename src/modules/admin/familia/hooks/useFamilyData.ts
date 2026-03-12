import { IResponseListarFamilias } from "../../../../@shared/types/responses";
import { listarFamiliaService } from "../services";
import { useCallback, useState } from "react";
import { AppError } from "@utils/app.error";
import { MESSAGES_ERROR } from "@utils/constantes";

export const useFetchDataFamily = () => {
    const [data, setData] = useState<IResponseListarFamilias[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({ isError: false, message: "" });

    const [pagination, setPagination] = useState({
        currentPage: 0,
        totalItens: 0,
        totalPages: 0,
        itemsPerPage: 10
    });

    const fetchData = useCallback(async (page = 1) => {
        setIsLoading(true);
        setError({ isError: false, message: "" });
        
        try {
            const result = await listarFamiliaService(page);
            setData(result?.data! || []);
            setPagination({
                ...pagination,
                currentPage: result.currentPage,
                totalItens: result.totalItens,
                totalPages: result.totalPages, 
            });
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : MESSAGES_ERROR.FETCH_ITENS;
            setError({ isError: true, message: title });
        } finally {
            setIsLoading(false);
        }
    }, [listarFamiliaService]);

    const clearError = useCallback(() => {
        setError({ isError: false, message: "" });
    }, []);

    const refetch = useCallback(async () => {
        await fetchData();
    }, [fetchData]);

    const onChangePage = useCallback(async (page: number) => {
        await fetchData(page);
    }, []);

    return {
        data,
        isLoading,
        error,
        pagination,
        fetchData,
        clearError,
        onChangePage,
        refetch
    }
}