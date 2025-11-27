// components/CustomSelect.tsx - SOLUÇÃO DEFINITIVA
import { Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectBackdrop, SelectContent, SelectItem, SelectDragIndicatorWrapper, SelectDragIndicator, Box, Text } from "@gluestack-ui/themed";
import { ChevronDownIcon } from "lucide-react-native";
import { useEffect, useState } from "react";

interface CustomSelectProps {
    options: { label: string, value: string, isDisabled?: boolean }[];
    placeholder?: string;
    size?: "sm" | "md" | "lg";
    variant?: "underlined" | "outline" | "rounded";
    selectedValue?: string;
    onValueChange: (value: string) => void;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({ 
    options, 
    placeholder = "Select option", 
    size = "md", 
    variant = "underlined", 
    selectedValue, 
    onValueChange 
}) => {
    const [displayValue, setDisplayValue] = useState("");
    const [forceRender, setForceRender] = useState(0);

    // Atualiza o display value baseado no selectedValue
    useEffect(() => {
        if (selectedValue === "" || selectedValue === undefined) {
            setDisplayValue("");
            setForceRender(prev => prev + 1); // Force reset
        } else {
            const selectedOption = options.find(opt => opt.value === selectedValue);
            setDisplayValue(selectedOption?.label || "");
        }
    }, [selectedValue, options]);

    const handleValueChange = (value: string) => {
        const selectedOption = options.find(opt => opt.value === value);
        setDisplayValue(selectedOption?.label || "");
        onValueChange(value);
    };

    // Key para forçar rerender quando necessário
    const selectKey = `select-${forceRender}-${selectedValue || 'empty'}`;

    return (
        <Box key={selectKey}>
            <Select 
                px="$1" 
                onValueChange={handleValueChange}
                selectedValue={selectedValue || ""}
            >
                <SelectTrigger variant={variant} size={size}>
                    {/* Input customizado que mostra o label */}
                    <Box flex={1} px="$2" justifyContent="center" minHeight={40}>
                        <Text color={displayValue ? "$textDark800" : "$textDark500"}>
                            {displayValue || placeholder}
                        </Text>
                    </Box>
                    <SelectIcon as={ChevronDownIcon} mr="$3" />
                </SelectTrigger>
                <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                        <SelectDragIndicatorWrapper>
                            <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        {options.map((option) => (
                            <SelectItem
                                key={option.value}
                                label={option.label}
                                value={option.value}
                                isDisabled={option.isDisabled}
                            />
                        ))}
                    </SelectContent>
                </SelectPortal>
            </Select>
        </Box>
    );
};