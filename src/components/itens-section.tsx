import { Divider, HStack, Text, VStack, Box, Input, InputField } from "@gluestack-ui/themed";
import React, { useState, useEffect } from "react";
import { CustomCheckbox } from "@components/checkbox";
import { MinusIcon, PlusIcon } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

interface CheckItemsProps {
    label: string;
    value: number;
    values: number[];
    onToggle: (value: number) => void;
    onQuantidadeChange?: (itemId: number, quantidade: number) => void;
    quantidadeInicial?: number;
}

const CheckItems = ({
    label,
    value,
    values,
    onToggle,
    quantidadeInicial = 1,
    onQuantidadeChange
}: CheckItemsProps) => {

    const [quantidade, setQuantidade] = useState(quantidadeInicial);
    const [inputValue, setInputValue] = useState(quantidadeInicial.toString());
    const isSelected = values.find((v: any) => v?.itemProdutoId === value);

    useEffect(() => {
        if (!isSelected) {
            setQuantidade(quantidadeInicial);
            setInputValue(quantidadeInicial.toString());
        }
    }, [isSelected]);

    const handleIncrement = () => {
        const novaQuantidade = quantidade + 1;
        setQuantidade(novaQuantidade);
        setInputValue(novaQuantidade.toString());
        if (isSelected && onQuantidadeChange) {
            onQuantidadeChange(value, novaQuantidade);
        }
    };

    const handleDecrement = () => {
        if (quantidade > 1) {
            const novaQuantidade = quantidade - 1;
            setQuantidade(novaQuantidade);
            setInputValue(novaQuantidade.toString());
            if (isSelected && onQuantidadeChange) {
                onQuantidadeChange(value, novaQuantidade);
            }
        }
    };

    const handleToggle = (value: string) => {
        onToggle(value);
    };

    return (
        <Box
            bg="$backgroundLight0"
            p="$3"
            borderRadius="$lg"
            borderWidth={1}
            borderColor={isSelected ? "$blue200" : "$borderLight200"}
        >
            <HStack space="md" alignItems="center" justifyContent="space-between">
                <CustomCheckbox
                    label={label}
                    value={value}
                    values={values}
                    onToggle={handleToggle}
                />

                {isSelected && (
                    <HStack space="sm" alignItems="center">
                        <TouchableOpacity 
                            onPress={handleDecrement}
                            disabled={quantidade <= 1}
                        >
                            <Box
                                bg="$blue100"
                                p="$1"
                                borderRadius="$md"
                                borderWidth={1}
                                borderColor="$blue200"
                                opacity={quantidade <= 1 ? 0.5 : 1}
                            >
                                <MinusIcon size={16} color="#2563eb" />
                            </Box>
                        </TouchableOpacity>

                        <Input
                            w={45}
                            h={36}
                            borderColor="$blue200"
                        >
                            <InputField
                                value={inputValue}
                                keyboardType="numeric"
                                textAlign="center" 
                                editable={false}
                            />
                        </Input>

                        <TouchableOpacity onPress={handleIncrement}>
                            <Box
                                bg="$blue100"
                                p="$1"
                                borderRadius="$md"
                                borderWidth={1}
                                borderColor="$blue200"
                            >
                                <PlusIcon size={16} color="#2563eb" />
                            </Box>
                        </TouchableOpacity>
                    </HStack>
                )}
            </HStack>
        </Box>
    );
};

export function ItensSection({ 
    produtos, 
    produtosSelecionados,
    onProdutoToggle,
    onQuantidadeChange,
    bg = "$backgroundLight50"
}: any) {

    return (
        <VStack space="md">
            
            <Text fontSize="$sm" color="$text600" mb="$2">
                Selecione os produtos que serão doados nesta ação
            </Text>

            <VStack space="lg" bg={bg} p="$4" borderRadius="$lg">
                {
                    produtos.map((produto: any) => (
                        <CheckItems
                            key={produto.value}
                            label={produto.label}
                            value={produto.value}
                            values={produtosSelecionados}
                            onToggle={onProdutoToggle}
                            onQuantidadeChange={onQuantidadeChange}
                        />
                    ))
                }

                {produtosSelecionados.length > 0 && (
                    <>
                        <Divider mt="$2" />
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
                    </>
                )}
            </VStack> 
        </VStack>
    );
}