import React, { useCallback, useState } from 'react';
import { Loading, ScreenHeader } from "@components/index";
import { VStack, ScrollView, Box } from "@gluestack-ui/themed";
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

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      bg="$white"
      flex={1}
    >
      <ScreenHeader title="Detalhes da Ação" />
      <Box mt="$4" mx="$4" mb="$6" bg="$white" borderRadius="$2xl">
        
      
      {
        isLoading 
        ? <Loading /> 
        : acao && (
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
            <AcoesSociaisDetalheHeader acao={acao} />
            
            <AcoesSociaisDetalheProgresso 
              acao={acao} 
            />

            <InformacoesAcao
              acao={acao} 
            />

            <AcoesSociaisDetalheItensCesta acao={acao} />

            <ImpactoSocial acao={acao} />

            <BotaoDoacao onPress={handleDoar} />
          </VStack>
        )
      }
      </Box>
    </ScrollView>
  );
};