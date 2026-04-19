import {
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
} from "@gluestack-ui/themed";
import { CheckIcon } from "@gluestack-ui/themed";

interface AppCheckboxProps {
  label: string;
  value: string;
  values: any[];
  onToggle: (value: string) => void;
  disabled?: boolean;
}

export function CustomCheckbox({
  label,
  value,
  values,
  onToggle,
  disabled = false,
}: AppCheckboxProps) {
  const isChecked = values.find(v => v?.itemProdutoId === value.toString());

  return (
    <Checkbox
      value={value}
      isChecked={!!isChecked}
      onChange={() => onToggle(value)}
      isDisabled={disabled}
    >
      <CheckboxIndicator
        borderColor="$primary600"
        mr="$2"
        $checked={{
          bg: "$primary600",
          borderColor: "$primary600",
        }}
      >
        <CheckboxIcon as={CheckIcon} color="$white" />
      </CheckboxIndicator>

      <CheckboxLabel>{label}</CheckboxLabel>
    </Checkbox>
  );
}