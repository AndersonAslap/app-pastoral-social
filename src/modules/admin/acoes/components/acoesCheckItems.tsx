import React, { useState, useEffect } from "react";
import { HStack, Box, Input, InputField } from "@gluestack-ui/themed";
import { CustomCheckbox } from "@shared/components/checkbox";
import { MinusIcon, PlusIcon } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

interface AcoesCheckItemsProps {
    label: string;
    value: number;
    values: number[];
    onToggle: (value: number) => void;
    onQuantidadeChange?: (itemId: number, quantidade: number) => void;
    quantidadeInicial?: number;
}

export const AcoesCheckItems = ({
    label,
    value,
    values,
    onToggle,
    quantidadeInicial = 1,
    onQuantidadeChange
}: any) => {

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