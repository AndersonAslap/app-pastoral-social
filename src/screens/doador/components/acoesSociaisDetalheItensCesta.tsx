import React from 'react';
import { Text, VStack, HStack, Box } from "@gluestack-ui/themed";
import { AcaoSocialDetalhe } from '@tipagens/doador';

interface AcoesSociaisDetalheItensCestaProps {
  acao: AcaoSocialDetalhe;
}

type StatusLevel = 'crítico' | 'alto' | 'medio' | 'baixo';

interface ItemCesta {
  nome: string;
  status: StatusLevel;
}

// Mapeamento de status para cores e ícones
const statusConfig: Record<StatusLevel, { 
  cor: string; 
  bg: string; 
  borda: string;
  icone: string;
  label: string;
}> = {
  crítico: {
    cor: '#E53935',
    bg: '#FFEBEE',
    borda: '#EF9A9A',
    icone: '🔴',
    label: 'Crítico'
  },
  alto: {
    cor: '#F57C00',
    bg: '#FFF3E0',
    borda: '#FFCC80',
    icone: '🟠',
    label: 'Alto'
  },
  medio: {
    cor: '#FBC02D',
    bg: '#FFFDE7',
    borda: '#FFF59D',
    icone: '🟡',
    label: 'Médio'
  },
  baixo: {
    cor: '#43A047',
    bg: '#E8F5E9',
    borda: '#A5D6A7',
    icone: '🟢',
    label: 'Baixo'
  }
};

export const AcoesSociaisDetalheItensCesta: React.FC<AcoesSociaisDetalheItensCestaProps> = ({ acao }) => {
  // Função auxiliar para extrair nome e status do item
  // Exemplo: "Feijão (KG) - (CRÍTICO)" -> { nome: "Feijão (KG)", status: "critico" }
  const parseItem = (itemString: string): ItemCesta => {
    const statusMatch = itemString.match(/- \((CRÍTICO|ALTO|MEDIO|BAIXO)\)$/i);
    const status = statusMatch 
      ? statusMatch[1].toLowerCase() as StatusLevel 
      : 'medio';
    
    const nome = itemString
      .replace(/\s*-\s*\((CRÍTICO|ALTO|MEDIO|BAIXO)\)$/i, '')
      .trim();
    
    return { nome, status };
  };

  const itensParseados = acao.itens.map(parseItem);

  // Ordenar itens por criticidade (crítico primeiro)
  const itensOrdenados = [...itensParseados].sort((a, b) => {
    const ordem: StatusLevel[] = ['crítico', 'alto', 'medio', 'baixo'];
    return ordem.indexOf(a.status) - ordem.indexOf(b.status);
  });

  // Contagem de itens por status para o resumo
  const resumo = {
    crítico: itensParseados.filter(i => i.status === 'crítico').length,
    alto: itensParseados.filter(i => i.status === 'alto').length,
    medio: itensParseados.filter(i => i.status === 'medio').length,
    baixo: itensParseados.filter(i => i.status === 'baixo').length
  };

  return (
    <Box
      bg="$white"
      borderRadius="$2xl"
      p="$5"
      borderWidth={1}
      borderColor="$borderLight100"
    >
      <VStack gap="$5">
        {/* Cabeçalho */}
        <HStack justifyContent="space-between" alignItems="center">
          <HStack gap="$2" alignItems="center">
            <Text fontSize="$2xl">🛒</Text>
            <Text fontSize="$lg" fontWeight="$bold" color="$textDark900">
              Itens da Cesta
            </Text>
          </HStack>
          <Box
            bg="$primary50"
            px="$3"
            py="$1"
            borderRadius="$full"
          >
            <Text fontSize="$xs" color="$primary600" fontWeight="$medium">
              {itensParseados.length} itens
            </Text>
          </Box>
        </HStack>

        {/* Resumo de Status - Mini indicadores */}
        {Object.values(resumo).some(v => v > 0) && (
          <HStack gap="$2" flexWrap="wrap">
            {Object.entries(resumo).map(([status, count]) => 
              count > 0 && (
                <HStack 
                  key={status} 
                  gap="$1" 
                  alignItems="center"
                  bg={statusConfig[status as StatusLevel].bg}
                  px="$2"
                  py="$1"
                  borderRadius="$md"
                >
                  <Text fontSize="$xs">{statusConfig[status as StatusLevel].icone}</Text>
                  <Text 
                    fontSize="$2xs" 
                    fontWeight="$medium"
                    color={statusConfig[status as StatusLevel].cor}
                  >
                    {count}
                  </Text>
                </HStack>
              )
            )}
          </HStack>
        )}

        {/* Lista de Itens */}
        <VStack gap="$2">
          {itensOrdenados.map((item, index) => {
            const config = statusConfig[item.status];
            return (
              <Box
                key={index}
                borderWidth={1}
                borderRadius="$xl"
                borderColor={config.borda}
                bg={config.bg}
                overflow="hidden"
              >
                <HStack alignItems="center" gap="$3">
                  {/* Barra lateral colorida */}
                  <Box
                    w="$1.5"
                    alignSelf="stretch"
                    bg={config.cor}
                  />
                  
                  {/* Conteúdo do item */}
                  <HStack 
                    flex={1} 
                    py="$3" 
                    pr="$4"
                    justifyContent="space-between" 
                    alignItems="center"
                  >
                    <HStack gap="$3" alignItems="center" flex={1}> 
                      <Text 
                        fontSize="$sm" 
                        color="$textDark800"
                        fontWeight="$medium"
                        flex={1}
                      >
                        {item.nome}
                      </Text>
                    </HStack>
                    
                    {/* Badge de status */}
                    <Box
                      px="$3"
                      py="$1"
                      borderRadius="$full"
                      bg={config.cor}
                    >
                      <Text 
                        fontSize="$2xs" 
                        fontWeight="$bold" 
                        color="white"
                        textTransform="uppercase"
                      >
                        {config.label}
                      </Text>
                    </Box>
                  </HStack>
                </HStack>
              </Box>
            );
          })}
        </VStack>

        {/* Legenda */}
        <HStack 
          justifyContent="space-around" 
          pt="$2"
          borderTopWidth={1}
          borderTopColor="$borderLight50"
        >
          {Object.entries(statusConfig).map(([key, config]) => (
            <HStack key={key} gap="$1" alignItems="center">
              <Text fontSize="$xs">{config.icone}</Text>
              <Text fontSize="$2xs" color="$textLight500">
                {config.label}
              </Text>
            </HStack>
          ))}
        </HStack>
      </VStack>
    </Box>
  );
};