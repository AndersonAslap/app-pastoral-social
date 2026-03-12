interface IEstoqueItem {
    id: number;
    nome: string;
    quantidadeEstoque: number;
}

interface IProduto {
    validade: Date | null;
    itemProdutoId: string | undefined;
    quantidade: number;
};

interface IProdutoPayload {
    validade: Date | null;
    itemProdutoId: number;
    quantidade: number;
};

export { IEstoqueItem, IProduto, IProdutoPayload };