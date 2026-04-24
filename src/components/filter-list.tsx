import { Box } from "@gluestack-ui/themed";
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
    title?: string;
}

export function FilterList({onFilterOpen, onSetIsFilterOpen, title = "Filtros", children} : Props) {
    return (
        <Actionsheet 
            isOpen={onFilterOpen} 
            onClose={() => onSetIsFilterOpen(false)} 
            snapPoints={[80]} // Define os pontos de snap
            // @ts-ignore
            disableOverlay={true} // Mantém o backdrop
            flex={1}
            p={0}
        >
            <ActionsheetBackdrop />
            <ActionsheetContent 
                borderTopLeftRadius="$3xl" 
                borderTopRightRadius="$3xl"
                // Força o alinhamento inferior
                position="absolute"
                bottom={0}
                top="auto"
                maxHeight="100%"
                width="100%"
            >
                <ActionsheetDragIndicatorWrapper>
                    <ActionsheetDragIndicator />
                </ActionsheetDragIndicatorWrapper>

                <Text fontSize="$lg" fontWeight="bold" mb="$4">
                    {title}
                </Text>

                 <Box flex={1} width="100%">
                    {children}
                </Box>
            </ActionsheetContent>
        </Actionsheet>
    )
}