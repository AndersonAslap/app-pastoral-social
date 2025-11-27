import { useState, useCallback } from 'react';
import { useToast } from "@gluestack-ui/themed";
import { AppError } from "@shared/utils/app.error";
import { ModeloTemplateCesta } from '../types';
import { listarTemplatesService } from '../services';
import { useFetchData } from '@hooks/useFetchData';
import { Toast } from '@gluestack-ui/themed';
import { ToastDescription } from '@gluestack-ui/themed';
import { gerarCestaService } from '@services/cesta.service';

interface UseModeloCestaReturn {
  // Estados do useFetchData
  items: ModeloTemplateCesta[];
  isLoading: boolean;
  error: { isError: boolean; message: string };
  refetch: () => Promise<void>;
  
  // Estados específicos do módulo
  isDetalhesOpen: boolean;
  modeloSelecionado: ModeloTemplateCesta | null;
  isGerandoCesta: boolean;
  
  // Ações específicas do módulo
  abrirDetalhes: (modelo: ModeloTemplateCesta) => void;
  fecharDetalhes: () => void;
  gerarCestas: (modelo: ModeloTemplateCesta) => Promise<void>;
}

export const useModeloTemplateCesta = (): UseModeloCestaReturn => {
  const toast = useToast();
  
  // Utiliza o hook genérico para fetch de dados
  const { 
    data: items, 
    isLoading, 
    error, 
    refetch 
  } = useFetchData({
    fetchFunction: listarTemplatesService,
    initialData: []
  });

  // Estados específicos do módulo
  const [isDetalhesOpen, setIsDetalhesOpen] = useState(false);
  const [modeloSelecionado, setModeloSelecionado] = useState<ModeloTemplateCesta | null>(null);
  const [isGerandoCesta, setIsGerandoCesta] = useState(false);

  // Ação de abrir detalhes
  const abrirDetalhes = useCallback((modelo: ModeloTemplateCesta) => {
    setModeloSelecionado(modelo);
    setIsDetalhesOpen(true);
  }, []);

  // Ação de fechar detalhes
  const fecharDetalhes = useCallback(() => {
    setIsDetalhesOpen(false);
    setModeloSelecionado(null);
  }, []);

  // Ação de gerar cestas
  const gerarCestas = useCallback(async (modelo: ModeloTemplateCesta) => {
    try {
      setIsGerandoCesta(true);
      await gerarCestaService({ idTemplate: modelo.idTemplate });
      
      // Feedback de sucesso
      toast.show({
        placement: "top",
        containerStyle: { marginTop: 40 },
        render: ({ id }) => (
          <Toast nativeID={id} action="success" variant="accent">
            <ToastDescription>Cestas geradas com sucesso!</ToastDescription>
          </Toast>
        )
      });
      
      // Recarrega a lista para atualizar quantidades
      await refetch();
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Erro ao gerar cestas";
      
      // Feedback de erro
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
      setIsGerandoCesta(false);
    }
  }, [refetch, toast]);

  return {
    // Estados do useFetchData
    items,
    isLoading,
    error,
    refetch,
    
    // Estados específicos do módulo
    isDetalhesOpen,
    modeloSelecionado,
    isGerandoCesta,
    
    // Ações específicas do módulo
    abrirDetalhes,
    fecharDetalhes,
    gerarCestas
  };
};