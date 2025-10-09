import { Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectBackdrop, SelectContent, SelectItem, SelectDragIndicatorWrapper, SelectDragIndicator } from "@gluestack-ui/themed";
import { ChevronDownIcon } from "lucide-react-native";

interface CustomSelectProps {
    options: { label: string, value: string, isDisabled?: boolean }[];
    placeholder?: string;
    size?: "sm" | "md" | "lg";
    variant?: "underlined" | "outline" | "rounded";
    onValueChange: (value: string) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, placeholder = "Select option", size = "md", variant = "underlined", onValueChange }) => {
    return (
        <Select px="$1" onValueChange={onValueChange}>
            <SelectTrigger variant={variant} size={size}>
                <SelectInput placeholder={placeholder} px="$2" />
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
    );
};

export default CustomSelect;
