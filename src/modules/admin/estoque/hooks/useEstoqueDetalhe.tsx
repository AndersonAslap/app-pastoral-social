// hooks/useEstoqueDetalhes.ts - VERSÃO COM MAIS CONTROLE
import { useState, useCallback, useEffect } from 'react';
import { Toast, ToastDescription, useToast } from "@gluestack-ui/themed";

import { listarProdutosService, removerEstoqueService } from "../services";
import { AppError } from "@shared/utils/app.error";
import { useFetchData } from '@hooks/useFetchData';

interface Product {
    id: number;
    validade: string;
    valorMedida: number;
    localizacao: string;
    unidadeDeMedida: string;
}

interface UseEstoqueDetalhesReturn {
    items: Product[];
    isLoading: boolean;
    error: { isError: boolean; message: string };
    showDeleteDialog: boolean;
    productToDelete: Product | null;
    handleDelete: (product: Product) => void;
    confirmDelete: () => Promise<void>;
    setShowDeleteDialog: (show: boolean) => void;
    refetchProducts: () => Promise<void>;
}

export const useEstoqueDetalhes = (productId: number, nome: string): UseEstoqueDetalhesReturn => {
    const toast = useToast();
    
    // Hook genérico para fetch
    const { 
        data: items, 
        isLoading, 
        error, 
        fetchData, 
        setData,
        refetch 
    } = useFetchData({
        fetchFunction: useCallback(() => listarProdutosService(productId), [productId]),
        initialData: []
    });

    // Estados específicos
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);

    // Fetch específico com parâmetros
    const refetchProducts = useCallback(async () => {
        await fetchData();
    }, [fetchData]);

    // Ação de deletar
    const handleDelete = useCallback((product: Product) => {
        setProductToDelete(product);
        setShowDeleteDialog(true);
    }, []);

    // Confirmação de exclusão
    const confirmDelete = useCallback(async () => {
        if (!productToDelete) return;

        try {
            await removerEstoqueService(productToDelete.id);
            
            // Atualiza a lista localmente
            setData(prev => prev.filter((item: Product) => item.id !== productToDelete.id));
            
            toast.show({
                placement: "top",
                containerStyle: { marginTop: 40 },
                render: ({ id }) => (
                    <Toast nativeID={id} action="success" variant="accent">
                        <ToastDescription>Produto excluído com sucesso!</ToastDescription>
                    </Toast>
                )
            });
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : "Erro ao excluir produto";
            
            toast.show({
                placement: "top",
                containerStyle: { marginTop: 40 },
                render: ({ id }) => (
                    <Toast nativeID={id} action="error" variant="accent">
                        <ToastDescription>{title}</ToastDescription>
                    </Toast>
                )
            });
        } finally {
            setShowDeleteDialog(false);
            setProductToDelete(null);
        }
    }, [productToDelete, setData, toast]);

    return {
        items,
        isLoading,
        error,
        showDeleteDialog,
        productToDelete,
        handleDelete,
        confirmDelete,
        setShowDeleteDialog,
        refetchProducts: refetch // Reexporta o refetch do hook genérico
    };
};