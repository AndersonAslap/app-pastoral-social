import { Select, SelectItem } from "@gluestack-ui/themed";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof Select> & {
    items: { label: string; value: string }[];
};

export function SelectWithBorder({ items, ...rest }: Props) {
    return (
        <Select
            bg="$white"
            h="$14"
            px="$4"
            borderWidth="$1"
            borderRadius="$md"
            borderColor="$blue300"
            $focus={{
                borderWidth: 1,
                borderColor: "$blue300",
            }}
            {...rest}
        >
            {items.map((item) => (
                <SelectItem key={item.value} label={item.label} value={item.value} />
            ))}
        </Select>
    );
}
