import { Button } from "@components/button";
import { Input } from "@components/input";
import { InputWithBorder } from "@components/input-with-border";
import { ScreenHeader } from "@components/screen-header";
import { SelectWithBorder } from "@components/select-with-border";
import { FormControl, FormControlLabel } from "@gluestack-ui/themed";
import { Center, View, VStack } from "@gluestack-ui/themed";
import { ScrollView } from "@gluestack-ui/themed";
import { useState } from "react";
import { Text } from "react-native";

export function ProductRegister() {
    const [status, setStatus] = useState<string>("");

    return (
        <View flex={1} bg="$blue100">
            <ScreenHeader title="Cadastrar Produtos" />
            <VStack
                flex={1}
                bg="$backgroundLight0"
                borderTopLeftRadius="$3xl"
                borderTopRightRadius="$3xl"
                px="$4"
                pt="$8"
            >
                <InputWithBorder placeholder="Item" />

                <SelectWithBorder
                    items={[
                        { label: "Ativo", value: "ativo" },
                        { label: "Inativo", value: "inativo" },
                    ]}
                    selectedValue={status} // garante string
                    onValueChange={(value) => setStatus(value)}
                    placeholder="Selecione o status"
                />
            </VStack>
        </View>
    );
}
