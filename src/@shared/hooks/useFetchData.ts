import { useState, useCallback } from 'react';
import { AppError } from "@shared/utils/app.error";
import { MESSAGES_ERROR } from "@shared/utils/constantes";

interface UseFetchDataProps<T> {
  fetchFunction: () => Promise<T[]>;
  initialData?: T[];
}

interface UseFetchDataReturn<T> {
  data: T[];
  isLoading: boolean;
  error: {
    isError: boolean;
    message: string;
  };
  fetchData: () => Promise<void>;
  setData: React.Dispatch<React.SetStateAction<T[]>>;
  clearError: () => void;
  refetch: () => Promise<void>;
}

export const useFetchData = <T,>({
  fetchFunction,
  initialData = []
}: UseFetchDataProps<T>): UseFetchDataReturn<T> => {
    const [data, setData] = useState<T[]>(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({ isError: false, message: "" });

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError({ isError: false, message: "" });
        
        try {
            const result = await fetchFunction();
            setData(result);
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : MESSAGES_ERROR.FETCH_ITENS;
            setError({ isError: true, message: title });
        } finally {
            setIsLoading(false);
        }
    }, [fetchFunction]);

    const clearError = useCallback(() => {
        setError({ isError: false, message: "" });
    }, []);

    const refetch = useCallback(async () => {
        await fetchData();
    }, [fetchData]);

    return {
        data,
        isLoading,
        error,
        fetchData,
        setData,
        clearError,
        refetch
    };
};