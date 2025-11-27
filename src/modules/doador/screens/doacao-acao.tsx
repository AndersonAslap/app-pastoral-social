import React from 'react';
import { ScreenHeader } from "@shared/components";
import { Text, VStack, ScrollView } from "@gluestack-ui/themed";
import { useDoacaoAcao } from '../hooks/useDoacaoAcao';
import { DoacaoAcaoHeaderInfo } from '../components/doacaoAcaoHeaderInfo';
import { AcaoInfo } from '../components/acaoInfo';
import { Seccao } from '../components/seccao';
import { DoacaoAcaoDadosPessoaisSection } from '../components/doacaoAcaoDadosPessoaisSection';
import { DetalhesDoacao } from '../components/detalhesDoacao';
import { AgendamentoEntrega } from '../components/agendamentoEntrega';
import { BotaoConfirmar } from '../components/botaoConfirmar';


export const DoacaoAcao: React.FC = () => {
  const {
    formData,
    acao,
    tiposDoacao,
    horariosDisponiveis,
    condicoesItens,
    showTipoDoacao,
    showHorario,
    showCondicao,
    setShowTipoDoacao,
    setShowHorario,
    setShowCondicao,
    handleInputChange,
    handleSelect,
    handleSubmit,
    isFormValid
  } = useDoacaoAcao();

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      bg="$white"
      flex={1}
    >
      <ScreenHeader title="Realizar Doação" />
      
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

        <AcaoInfo acao={acao} />

        <Seccao titulo="Seus Dados" icone="👤">
          <DoacaoAcaoDadosPessoaisSection
            formData={formData}
            onInputChange={handleInputChange}
          />
        </Seccao>

        <Seccao titulo="Itens para Doação" icone="🎁">
          <DetalhesDoacao
            formData={formData}
            tiposDoacao={tiposDoacao}
            condicoesItens={condicoesItens}
            showTipoDoacao={showTipoDoacao}
            showCondicao={showCondicao}
            onInputChange={handleInputChange}
            onSelect={handleSelect}
            setShowTipoDoacao={setShowTipoDoacao}
            setShowCondicao={setShowCondicao}
          />
        </Seccao>

        <Seccao titulo="Agendamento da Entrega" icone="📅">
          <AgendamentoEntrega
            formData={formData}
            horariosDisponiveis={horariosDisponiveis}
            showHorario={showHorario}
            onInputChange={handleInputChange}
            onSelect={handleSelect}
            setShowHorario={setShowHorario}
          />
        </Seccao>

        <BotaoConfirmar
          onPress={handleSubmit}
          isFormValid={isFormValid()}
        />

        <Text fontSize="$xs" color="$textDark500" textAlign="center" px="$4">
          * Campos obrigatórios. Após o envio, entraremos em contato para confirmar os detalhes.
        </Text>
      </VStack>
    </ScrollView>
  );
};