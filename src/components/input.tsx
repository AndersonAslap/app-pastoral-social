import { Input as GluestackInput, InputField } from "@gluestack-ui/themed";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof InputField>;

export function Input({...rest}: Props) {
    return (
        <GluestackInput
            bg="$white"
            h="$14"
            px="$4"
            borderWidth="$0"
            borderRadius="$md"
            $focus={{
                borderWidth: 1,
                borderColor: "$blue300"
            }}
        >
            <InputField 
                fontFamily="$body"
                {...rest}
            />
        </GluestackInput>
    )
}