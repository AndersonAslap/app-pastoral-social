import React, { useCallback, useState } from 'react';
import { Loading, ScreenHeader } from "@components/index";
import { Text, VStack, ScrollView } from "@gluestack-ui/themed";
import { useDoacaoAcao } from '@hooks/doador/useDoacaoAcao';
import { DoacaoAcaoHeaderInfo } from './components/doacaoAcaoHeaderInfo';
import { Seccao } from './components/seccao';
import { DoacaoAcaoDadosPessoaisSection } from './components/doacaoAcaoDadosPessoaisSection';
import { AgendamentoEntrega } from './components/agendamentoEntrega';
import { BotaoConfirmar } from './components/botaoConfirmar';
import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native';
import { AuthRoutes } from '@routes/auth.routes';
import { listarAcoesPorId } from '@services/acoes';
import { ItensSection } from '@components/itens-section';

type DoacaoAcaoFormRouteProp = RouteProp<AuthRoutes, 'doacaoAcao'>;

export const DoacaoAcao: React.FC = () => {
  const {
    formData,
    fieldState,
    handleInputChange,
    handleSubmit,
    produtosSelecionados,
    setProdutos,
    handleProdutoToggle,
    handleProdutoChangeQuantidade,
    produtos,
    submitting
  } = useDoacaoAcao();

  const route = useRoute<DoacaoAcaoFormRouteProp>();
  const { id } = route.params;

  const [isLoading, setIsLoading] = useState(false);
  

  
  const fetchAcaoDetalhe = async () => {
    setIsLoading(true);
    try {
      if (!id) return;

      handleInputChange("idAcao", id);

      const data = await listarAcoesPorId(id); 
      setProdutos(data?.products);
    } catch (error) {
      console.error("Erro ao buscar detalhes da ação:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchAcaoDetalhe();
    }, [])
  );

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      bg="$white"
      flex={1}
    >
      <ScreenHeader title="Realizar Doação" />

      {
        isLoading
        ? <Loading />
        : produtos && (
          <VStack
        flex={1}
        bg="$blue50"
        borderTopLeftRadius="$3xl"
        borderTopRightRadius="$3xl"
        px="$6"
        pt="$8"
        pb="$8"
        gap="$6"
      >
        <DoacaoAcaoHeaderInfo />

        <Seccao titulo="Seus Dados" icone="👤">
          <DoacaoAcaoDadosPessoaisSection
            formData={formData}
            fieldState={fieldState}
            onInputChange={handleInputChange}
          />
        </Seccao>

        <Seccao titulo="Itens para Doação" icone="🎁">
          <ItensSection
            produtos={produtos}
            produtosSelecionados={produtosSelecionados}
            onProdutoToggle={handleProdutoToggle}
            onQuantidadeChange={handleProdutoChangeQuantidade}
            bg="$blue50"
          />
        </Seccao>

        <Seccao titulo="Agendamento da Entrega" icone="📅">
          <AgendamentoEntrega
            formData={formData}
            fieldState={fieldState}
            onInputChange={handleInputChange}
          />
        </Seccao>

        <BotaoConfirmar
          onPress={handleSubmit}
          submitting={submitting}
        />

        <Text fontSize="$xs" color="$textDark500" textAlign="center" px="$4">
          * Campos obrigatórios. Após o envio, entraremos em contato para confirmar os detalhes.
        </Text>
      </VStack>
        )
      }
      
      
    </ScrollView>
  );
};