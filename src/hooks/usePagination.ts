import { useState, useMemo } from "react";

interface UsePaginationProps<T> {
    data: T[];
    initialPage?: number;
    initialItemsPerPage?: number;
}

export function usePagination<T>({ 
    data, 
    initialPage = 1, 
    initialItemsPerPage = 10 
}: UsePaginationProps<T>) {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const totalItems = data.length;

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    }, [data, currentPage, itemsPerPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1); // Volta para primeira página ao mudar itens por página
    };

    return {
        currentPage,
        itemsPerPage,
        totalPages,
        totalItems,
        paginatedData,
        handlePageChange,
        handleItemsPerPageChange,
    };
}