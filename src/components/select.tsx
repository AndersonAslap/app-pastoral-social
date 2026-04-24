import { 
    Select, 
    SelectTrigger, 
    SelectIcon, 
    SelectPortal, 
    SelectBackdrop, 
    SelectContent, 
    SelectItem, 
    SelectDragIndicatorWrapper, 
    SelectDragIndicator, 
    Box, 
    Text 
} from "@gluestack-ui/themed";
import { ChevronDownIcon } from "lucide-react-native";
import { useEffect, useState, useRef } from "react";
import { Platform } from "react-native";

interface CustomSelectProps {
    options: { label: string, value: string, isDisabled?: boolean }[];
    placeholder?: string;
    size?: "sm" | "md" | "lg";
    variant?: "underlined" | "outline" | "rounded";
    selectedValue?: string;
    onValueChange: (value: string) => void;
    error?: boolean;
    errorMessage?: string
}

export const CustomSelect: React.FC<CustomSelectProps> = ({ 
    options, 
    placeholder = "Select option", 
    size = "md", 
    variant = "underlined", 
    selectedValue, 
    error = false,
    errorMessage = "",
    onValueChange
}) => {
    const [displayValue, setDisplayValue] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<any>(null);

    // Atualiza o display value baseado no selectedValue
    useEffect(() => {
        if (selectedValue === "" || selectedValue === undefined) {
            setDisplayValue("");
        } else {
            const selectedOption = options.find(opt => opt.value === selectedValue);
            setDisplayValue(selectedOption?.label || "");
        }
    }, [selectedValue, options]);

    const handleValueChange = (value: string) => {
        const selectedOption = options.find(opt => opt.value === value);
        setDisplayValue(selectedOption?.label || "");
        onValueChange(value);
        setIsOpen(false);
    };

    return (
        <Box>
            <Select 
                onValueChange={handleValueChange}
                selectedValue={selectedValue || ""}
                isOpen={isOpen}
                onOpen={() => setIsOpen(true)}
                onClose={() => setIsOpen(false)}
            >
                <SelectTrigger 
                    variant={variant} 
                    size={size}
                    ref={triggerRef}
                >
                    <Box flex={1} px="$2" justifyContent="center" minHeight={40}>
                        <Text color={displayValue ? "$textDark800" : "$textDark500"}>
                            {displayValue || placeholder}
                        </Text>
                    </Box>
                    <SelectIcon as={ChevronDownIcon} mr="$3" />
                </SelectTrigger>
                
                <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent
                        // Força o alinhamento inferior
                        placement="top"
                        // Para web, usa posicionamento fixo
                        {...(Platform.OS === 'web' && {
                            style: {
                                position: 'fixed',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                top: 'auto',
                                maxHeight: '80%',
                                transform: 'translateY(0)',
                            }
                        })}
                        // Para mobile, força a âncora na parte inferior
                        {...(Platform.OS !== 'web' && {
                            anchorPosition: 'bottom',
                        })}
                        pb="$16"
                    >
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

            {(error && errorMessage) && (
                <Text
                    color="$red500"
                    fontSize="$xs"
                    px="$1"
                    mr="auto"
                >
                    {errorMessage}
                </Text>
            )}
        </Box>
    );
};