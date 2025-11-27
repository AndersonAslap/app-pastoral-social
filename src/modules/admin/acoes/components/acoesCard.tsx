import { Box, VStack, HStack, Text, Button, ButtonText, Badge, BadgeText } from "@gluestack-ui/themed";
import { AcaoSocial } from "../types";
import { AcoesInfo } from "./acoesInfo";
import { AcoesItensArrecadacao } from "./acoesItensArrecadados";
import { getStatusConfig } from "../helper/acoes.helper";

interface AcoesCardProps {
  acao: AcaoSocial;
  onDetalhes: (acao: AcaoSocial) => void;
  onEditar: (acao: AcaoSocial) => void;
}

export const AcoesCard = ({ acao, onDetalhes, onEditar }: AcoesCardProps) => {
  const statusConfig = getStatusConfig(acao.status);

  return (
    <Box
      key={acao.id}
      bg="$white"
      borderRadius="$2xl"
      p="$4"
      borderLeftWidth="$4"
      borderLeftColor={statusConfig.color + "500"}
    >
      {/* Header com Status */}
      <HStack justifyContent="space-between" alignItems="flex-start" mb="$3">
        <VStack flex={1} space="xs">
          <Badge 
            size="sm" 
            bg={statusConfig.bg}
            borderWidth="$1"
            borderColor={statusConfig.color + "300"}
            alignSelf="flex-start"
          >
            <BadgeText color={statusConfig.text} fontSize="$2xs" fontWeight="bold">
              {statusConfig.label}
            </BadgeText>
          </Badge>
          
          <Text fontSize="$lg" fontWeight="bold" color="$textDark800">
            {acao.nome}
          </Text>
          
          <Text fontSize="$sm" color="$textDark600" numberOfLines={2}>
            {acao.descricao}
          </Text>
        </VStack>
      </HStack>

      {/* Informações da Ação */}
      <AcoesInfo data={acao.data} local={acao.local} />

      {/* Itens para Arrecadar */}
      <AcoesItensArrecadacao itens={acao.itensArrecadacao} />

      {/* Ações */}
      <HStack space="sm">
        <Button 
          size="sm" 
          variant="outline" 
          bg="$white" 
          flex={1}
          borderColor="$blue300"
          onPress={() => onDetalhes(acao)}
        >
          <ButtonText fontSize="$sm" color="$blue600">Detalhes</ButtonText>
        </Button>
        
        {acao.status !== 'concluida' && acao.status !== 'cancelada' && (
          <Button 
            size="sm" 
            variant="outline" 
            bg="$white" 
            flex={1}
            borderColor="$green300"
            onPress={() => onEditar(acao)}
          >
            <ButtonText fontSize="$sm" color="$green600">Editar</ButtonText>
          </Button>
        )}
      </HStack>
    </Box>
  );
};