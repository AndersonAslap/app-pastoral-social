import React, { useEffect, useState } from "react";
import { HStack, Switch, Text } from "@gluestack-ui/themed";

interface CustomSwitchProps {
    label: string;
    isChecked: boolean;
    onChange?: (checked: boolean) => void;
}

export const CustomSwitch: React.FC<CustomSwitchProps> = ({ label, isChecked = false, onChange }) => {
    const [checked, setChecked] = useState(isChecked);

    useEffect(() => {
        setChecked(isChecked);
    }, [isChecked]);

    const handleChange = () => {
        const newValue = !checked;
        setChecked(newValue);
        onChange?.(newValue);
    };

    return (
        <HStack space="md" style={{ flexDirection: "row", alignItems: "center" }}>
            <Switch
                value={checked}
                onValueChange={handleChange}
            />
            <Text size="sm" onPress={handleChange}>{label}</Text>
        </HStack>
    );
};