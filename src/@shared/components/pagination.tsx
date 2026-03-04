import { HStack, Box, Text, Pressable, Icon, Button, VStack } from "@gluestack-ui/themed";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react-native";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange?: (itemsPerPage: number) => void;
    showItemsPerPage?: boolean;
    itemsPerPageOptions?: number[];
    siblingCount?: number;
    showFirstLastButtons?: boolean;
    showTotalItems?: boolean;
}

export function Pagination({
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    onPageChange,
    onItemsPerPageChange,
    showItemsPerPage = false,
    itemsPerPageOptions = [10, 20, 50, 100],
    siblingCount = 1,
    showFirstLastButtons = true,
    showTotalItems = true,
}: PaginationProps) {
    
    const generatePages = () => {
        const pages: (number | string)[] = [];
        
        if (totalPages <= 3 ) {
            // Mostra todas as páginas se forem poucas
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Lógica para mostrar páginas com ellipsis
            if (currentPage <= 3) {
                // Início: 1, 2, 3, 4, ..., totalPages
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                // Final: 1, ..., totalPages-3, totalPages-2, totalPages-1, totalPages
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                // Meio: 1, ..., currentPage-1, currentPage, currentPage+1, ..., totalPages
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }
        
        return pages;
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            onPageChange(page);
        }
    };

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
        <VStack space="sm" mt="$4" mb="$2" >
            {/* Controles de paginação */}
            <HStack space="xs" justifyContent="center" alignItems="center" flexWrap="wrap">
                {/* Botão primeira página */}
                {showFirstLastButtons && (
                    <Pressable
                        onPress={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                        opacity={currentPage === 1 ? 0.5 : 1}
                    >
                        <Box p="$2" borderRadius="$md" bg="$backgroundLight100">
                            <Icon as={ChevronsLeft} size="sm" color="$textDark400" />
                        </Box>
                    </Pressable>
                )}

                {/* Botão página anterior */}
                <Pressable
                    onPress={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    opacity={currentPage === 1 ? 0.5 : 1}
                >
                    <Box p="$2" borderRadius="$md" bg="$backgroundLight100">
                        <Icon as={ChevronLeft} size="sm" color="$textDark400" />
                    </Box>
                </Pressable>

                {/* Números das páginas */}
                <HStack space="xs">
                    {generatePages().map((page, index) => (
                        <Pressable
                            key={`${page}-${index}`}
                            onPress={() => typeof page === 'number' && handlePageChange(page)}
                            disabled={page === '...'}
                        >
                            <Box
                                px="$3"
                                py="$2"
                                borderRadius="$md"
                                bg={page === currentPage ? "$green600" : "$backgroundLight100"}
                            >
                                <Text
                                    fontSize="$sm"
                                    fontWeight={page === currentPage ? "$bold" : "$normal"}
                                    color={page === currentPage ? "white" : "$textDark400"}
                                >
                                    {page}
                                </Text>
                            </Box>
                        </Pressable>
                    ))}
                </HStack>

                {/* Botão próxima página */}
                <Pressable
                    onPress={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    opacity={currentPage === totalPages ? 0.5 : 1}
                >
                    <Box p="$2" borderRadius="$md" bg="$backgroundLight100">
                        <Icon as={ChevronRight} size="sm" color="$textDark400" />
                    </Box>
                </Pressable>

                {/* Botão última página */}
                {showFirstLastButtons && (
                    <Pressable
                        onPress={() => handlePageChange(totalPages)}
                        disabled={currentPage === totalPages}
                        opacity={currentPage === totalPages ? 0.5 : 1}
                    >
                        <Box p="$2" borderRadius="$md" bg="$backgroundLight100">
                            <Icon as={ChevronsRight} size="sm" color="$textDark400" />
                        </Box>
                    </Pressable>
                )}
            </HStack>
        </VStack>
    );
}