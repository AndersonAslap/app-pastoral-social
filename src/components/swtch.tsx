import React, { useState } from "react";
import { HStack, Switch, Text } from "@gluestack-ui/themed";

interface CustomSwitchProps {
    label: string;
    isChecked: boolean;
    onChange?: (checked: boolean) => void;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({ label, isChecked = false, onChange }) => {

    return (
        <HStack space="md" style={{ flexDirection: "row", alignItems: "center" }}>
            <Switch
                isChecked={isChecked}
                onChange={event => onChange?.(event.nativeEvent.value)}
            />
            <Text size="sm">{label}</Text>
        </HStack>
    );
};

export default CustomSwitch;
