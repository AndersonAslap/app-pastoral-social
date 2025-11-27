import React from 'react';
import { Text, VStack, HStack, Input } from "@gluestack-ui/themed";
import { DoacaoFormData } from '../types';
import { CustomSelect } from '@shared/components';

interface DetalhesDoacaoProps {
  formData: DoacaoFormData;
  tiposDoacao: string[];
  condicoesItens: string[];
  showTipoDoacao: boolean;
  showCondicao: boolean;
  onInputChange: (field: keyof DoacaoFormData, value: string) => void;
  onSelect: (field: keyof DoacaoFormData, value: string, setShow: (show: boolean) => void) => void;
  setShowTipoDoacao: (show: boolean) => void;
  setShowCondicao: (show: boolean) => void;
}

export const DetalhesDoacao: React.FC<DetalhesDoacaoProps> = ({
  formData,
  tiposDoacao,
  condicoesItens,
  showTipoDoacao,
  showCondicao,
  onInputChange,
  onSelect,
  setShowTipoDoacao,
  setShowCondicao
}) => {
  return (
    <VStack gap="$3">
      <VStack gap="$1">
        <Text fontSize="$sm" fontWeight="$medium" color="$textDark700">
          Tipo de Doação *
        </Text>
        <CustomSelect
          value={formData.tipoDoacao}
          options={tiposDoacao}
          onSelect={(value) => onSelect("tipoDoacao", value, setShowTipoDoacao)}
          placeholder="Selecione o tipo de doação"
          show={showTipoDoacao}
          setShow={setShowTipoDoacao}
        />
      </VStack>

      <VStack gap="$1">
        <Text fontSize="$sm" fontWeight="$medium" color="$textDark700">
          Itens que está doando *
        </Text>
        <Input
          variant="outline"
          size="md"
          placeholder="Ex: 2 cestas básicas, 5kg de arroz, 3 pacotes de feijão..."
          value={formData.itensDoados}
          onChangeText={(value) => onInputChange("itensDoados", value)}
        />
      </VStack>

      <HStack gap="$3">
        <VStack flex={1} gap="$1">
          <Text fontSize="$sm" fontWeight="$medium" color="$textDark700">
            Quantidade *
          </Text>
          <Input
            variant="outline"
            size="md"
            placeholder="Ex: 2 unidades, 5kg"
            value={formData.quantidade}
            onChangeText={(value) => onInputChange("quantidade", value)}
          />
        </VStack>

        <VStack flex={1} gap="$1">
          <Text fontSize="$sm" fontWeight="$medium" color="$textDark700">
            Condição dos itens
          </Text>
          <CustomSelect
            value={formData.condicaoItens}
            options={condicoesItens}
            onSelect={(value) => onSelect("condicaoItens", value, setShowCondicao)}
            placeholder="Condição dos itens"
            show={showCondicao}
            setShow={setShowCondicao}
          />
        </VStack>
      </HStack>
    </VStack>
  );
};