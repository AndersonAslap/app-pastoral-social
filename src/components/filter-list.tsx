import { 
    Actionsheet, 
    ActionsheetContent, 
    ActionsheetDragIndicator, 
    ActionsheetDragIndicatorWrapper, 
    ActionsheetBackdrop,  
    Text 
} from "@gluestack-ui/themed";
import { ReactNode } from "react";

type Props = {
    onFilterOpen: boolean;
    onSetIsFilterOpen: (open: boolean) => void;
    children: ReactNode;
}

export function FilterList({onFilterOpen, onSetIsFilterOpen, children} : Props) {
    return (
        <Actionsheet isOpen={onFilterOpen} onClose={() => onSetIsFilterOpen(false)}>
            <ActionsheetBackdrop />
            <ActionsheetContent borderTopLeftRadius="$3xl" borderTopRightRadius="$3xl">
                <ActionsheetDragIndicatorWrapper>
                    <ActionsheetDragIndicator />
                </ActionsheetDragIndicatorWrapper>

                <Text fontSize="$lg" fontWeight="bold" mb="$4">
                    Filtros
                </Text>

                {children}
            </ActionsheetContent>
        </Actionsheet>
    )
}