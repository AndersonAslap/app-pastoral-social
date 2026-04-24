import React, { useCallback, useState } from 'react';
import { Loading, ScreenHeader } from "@components/index";
import { VStack, ScrollView, Box, Text, Pressable } from "@gluestack-ui/themed";
import { AcoesSociaisDetalheHeader } from './components/acoesSociaisDetalheHeader';
import { AcoesSociaisDetalheProgresso } from './components/acoesSociaisDetalheProgresso';
import { InformacoesAcao } from './components/informacoesAcoes';
import { AcoesSociaisDetalheItensCesta } from './components/acoesSociaisDetalheItensCesta';
import { ImpactoSocial } from './components/impactoSocial';
import { BotaoDoacao } from './components/botaoDoacao';
import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { AuthNavigatorRoutesProps, AuthRoutes } from '@routes/auth.routes';
import { listarAcoesPorId } from '@services/acoes';

type AcaoDetalhesRouteProp = RouteProp<AuthRoutes, 'doadorDetalheAcao'>; 

export const DoadorDetalheAcao: React.FC = () => {
   
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  
  const route = useRoute<AcaoDetalhesRouteProp>();
  const { id } = route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [acao, setAcao] = useState<any>(null);

  const handleDoar = () => {
    navigation.navigate("doacaoAcao", { id: acao.id });
  }

  const fetchAcaoDetalhe = async () => {
    setIsLoading(true);
    try {
      const data = await listarAcoesPorId(id); 
      setAcao(data);
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

  const handleGoBack = () => {
    navigation.goBack();
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      bg="$white"
      flex={1}
    >
      <ScreenHeader title="Detalhes da Ação" />
      <Box flex={1} bg="$blue50">
      {
        isLoading 
        ? <Loading /> 
        : acao && (
          <VStack
            flex={1}
            px="$6"
            pt="$8"
            pb="$16"
            gap="$6"
          >
            <AcoesSociaisDetalheHeader acao={acao} />

            {acao.statusAcao === "EM_ANDAMENTO" && (
              <AcoesSociaisDetalheProgresso acao={acao} />   
            )}
            
            <InformacoesAcao
              acao={acao} 
            />

            {acao.statusAcao !== "CONCLUIDA" && (acao.tipoAcao === "Cestas Básicas" || acao.tipoAcao === "Refeições") && (
              <AcoesSociaisDetalheItensCesta acao={acao} />
            )}

            <ImpactoSocial acao={acao} />

            {acao.statusAcao === "EM_ANDAMENTO" && <BotaoDoacao onPress={handleDoar} />}
            {acao.statusAcao !== "EM_ANDAMENTO" && (
              <Pressable onPress={handleGoBack} mt="$4">
                    {({ pressed }) => (
                      <Box
                        bg="$primary500"
                        borderRadius="$xl"
                        py="$4"
                        alignItems="center"
                        justifyContent="center"
                        flexDirection="row"
                        gap="$3"
                        style={{
                          transform: [{ scale: pressed ? 0.95 : 1 }]
                        }}
                        /*transition="all 0.2s"*/
                      >
                        <Text
                          fontSize="$lg" 
                          fontWeight="$bold" 
                          color="$white"
                        >
                          Fechar
                        </Text>
                      </Box>
                    )}
                  </Pressable>
            )}
          </VStack>
        )
      }
      </Box>
    </ScrollView>
  );
};