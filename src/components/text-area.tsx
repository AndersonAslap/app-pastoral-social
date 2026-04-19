import { Textarea as GluestackTextArea, TextareaInput } from "@gluestack-ui/themed";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof TextareaInput>;

export function TextArea({ ...rest }: Props) {
    return (
        <GluestackTextArea
            bg="$white"
            minHeight={120}
            maxHeight={200}
            px="$1"
            borderWidth="$0"
            borderRadius="$md"
            $focus={{
                borderWidth: 1,
                borderColor: "$blue300"
            }}
        >
            <TextareaInput
                fontFamily="$body"
                {...rest}
            />
        </GluestackTextArea>
    )
}