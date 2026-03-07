import { Input as GluestackInput, InputField, Text } from "@gluestack-ui/themed";
import { ComponentProps } from "react";
import { TextInputProps } from "react-native";

type Props = ComponentProps<typeof InputField> & {
  isDisabled?: boolean;
  error?: boolean;
  helperText?: string;
  onSubmitEditing?: () => void;
  returnKeyType?: TextInputProps['returnKeyType'];
  blurOnSubmit?: boolean;
};

export function Input({ 
  isDisabled = false, 
  error = false, 
  helperText = "", 
  onSubmitEditing,
  returnKeyType,
  blurOnSubmit,
  ...rest 
}: Props) {
    return (
        <>
            <GluestackInput
                bg="$white"
                h="$14"
                px="$1"
                borderWidth={error ? 1 : 0}
                borderColor={error ? "$red500" : "transparent"}
                borderRadius="$md"
                $focus={{
                borderWidth: isDisabled ? 0 : 1,
                borderColor: error ? "$red500" : "$blue300",
                }}
                opacity={isDisabled ? 0.7 : 1}
            >
                <InputField
                    fontFamily="$body"
                    editable={!isDisabled}
                    onSubmitEditing={onSubmitEditing}
                    returnKeyType={returnKeyType}
                    blurOnSubmit={blurOnSubmit}
                    {...rest}
                />
            </GluestackInput>

            {error && helperText && (
                <Text
                    color="$red500"
                    fontSize="$xs"
                    px="$1"
                    mr="auto"
                >
                    {helperText}
                </Text>
            )}
        </>
    )
}