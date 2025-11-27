import React from 'react';
import { ScreenHeader } from "@shared/components";
import { VStack, ScrollView } from "@gluestack-ui/themed";
import { useAcaoDetalhe } from '../hooks/useAcoesSociaisDetalhe';
import { AcoesSociaisDetalheHeader } from '../components/acoesSociaisDetalheHeader';
import { AcoesSociaisDetalheProgresso } from '../components/acoesSociaisDetalheProgresso';
import { InformacoesAcao } from '../components/informacoesAcoes';
import { AcoesSociaisDetalheItensCesta } from '../components/acoesSociaisDetalheItensCesta';
import { ImpactoSocial } from '../components/impactoSocial';
import { BotaoDoacao } from '../components/botaoDoacao';

export const DoadorDetalheAcao: React.FC = () => {
  const {
    acao,
    formatarNumero,
    formatarData,
    handleDoar
  } = useAcaoDetalhe();

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      bg="$white"
      flex={1}
    >
      <ScreenHeader title="Detalhes da Ação" />
      
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
          formatarNumero={formatarNumero} 
        />

        <InformacoesAcao
          acao={acao} 
          formatarData={formatarData} 
        />

        <AcoesSociaisDetalheItensCesta acao={acao} />

        <ImpactoSocial acao={acao} />

        <BotaoDoacao onPress={handleDoar} />
      </VStack>
    </ScrollView>
  );
};