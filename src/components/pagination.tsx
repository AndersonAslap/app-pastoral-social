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
        const pages: number[] = [];
        
        if (totalPages <= 3) {
            // Se tem 3 páginas ou menos, mostra todas
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Mostra sempre 3 números consecutivos baseados na página atual
            let startPage = currentPage;
            let endPage = currentPage + 2;
            
            // Ajusta se estiver no final
            if (endPage > totalPages) {
                endPage = totalPages;
                startPage = totalPages - 2;
            }
            
            // Ajusta se estiver no início
            if (startPage < 1) {
                startPage = 1;
                endPage = 3;
            }
            
            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
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
        <VStack space="sm" mt="$4" mb="$2">
            {/* Informação de total de itens (opcional) */}
            {showTotalItems && totalItems > 0 && (
                <Box alignItems="center" mb="$2">
                    <Text fontSize="$sm" color="$textDark500">
                        Mostrando {startItem} - {endItem} de {totalItems} itens
                    </Text>
                </Box>
            )}

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

                {/* Números das páginas - SEMPRE 3 NÚMEROS CONSECUTIVOS */}
                <HStack space="xs">
                    {generatePages().map((page) => (
                        <Pressable
                            key={page}
                            onPress={() => handlePageChange(page)}
                        >
                            <Box
                                px="$3"
                                py="$2"
                                borderRadius="$md"
                                bg={page === currentPage ? "$green600" : "$backgroundLight100"}
                                minWidth={36}
                                alignItems="center"
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

            {/* Seletor de itens por página (opcional) */}
            {showItemsPerPage && onItemsPerPageChange && (
                <HStack space="sm" justifyContent="center" alignItems="center" mt="$2">
                    <Text fontSize="$sm" color="$textDark500">
                        Itens por página:
                    </Text>
                    <HStack space="xs">
                        {itemsPerPageOptions.map((option) => (
                            <Pressable
                                key={option}
                                onPress={() => onItemsPerPageChange(option)}
                            >
                                <Box
                                    px="$3"
                                    py="$1"
                                    borderRadius="$md"
                                    bg={itemsPerPage === option ? "$green600" : "$backgroundLight100"}
                                >
                                    <Text
                                        fontSize="$sm"
                                        color={itemsPerPage === option ? "white" : "$textDark400"}
                                    >
                                        {option}
                                    </Text>
                                </Box>
                            </Pressable>
                        ))}
                    </HStack>
                </HStack>
            )}
        </VStack>
    );
}