import { Divider, HStack, Text, VStack } from "@gluestack-ui/themed";
import { AcoesCheckItems } from "./acoesCheckItems";
import { useState } from "react";

export function AcoesItensAcaoSection({ 
    produtos, 
    produtosSelecionados,
    onProdutoToggle,
    onQuantidadeChange
}: any) {

    return (
        <VStack space="md">
            <Text
                fontSize="$lg" 
                fontWeight="$bold" 
                color="$textDark900"
                mb="$2"
            >
                Itens para Distribuição
            </Text>
            
            <Text fontSize="$sm" color="$text600" mb="$2">
                Selecione os produtos que serão distribuídos nesta ação
            </Text>

            <VStack space="lg" bg="$backgroundLight100" p="$4" borderRadius="$lg">
                {
                    produtos.map((produto: any) => (
                        <AcoesCheckItems
                            key={produto.value}
                            label={produto.label}
                            value={produto.value}
                            values={produtosSelecionados}
                            onToggle={onProdutoToggle}
                            onQuantidadeChange={onQuantidadeChange}
                        />
                    ))
                }

                <Divider mt="$2" />
            </VStack>
            
            {/* Contador de itens selecionados */}
            {produtosSelecionados.length > 0 && (
                <HStack
                    mt="$2" 
                    p="$3" 
                    bg="$green50" 
                    borderRadius="$lg"
                    borderWidth={1}
                    borderColor="$green200"
                    justifyContent="space-between"
                >
                    <Text fontSize="$sm" color="$green700">
                        Itens selecionados:
                    </Text>
                    <Text fontSize="$sm" fontWeight="$bold" color="$green700">
                        {produtosSelecionados.length}
                    </Text>
                </HStack>
            )}
        </VStack>
    );
}