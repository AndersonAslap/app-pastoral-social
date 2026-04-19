interface IEstoqueItem {
    id: number;
    nome: string;
    quantidadeEstoque: number;
}

interface IProduto {
    validade: Date | null;
    itemProdutoId: string | undefined;
    codProduto: string;
};

interface IProdutoPayload {
    validade: Date | null;
    itemProdutoId: number;
    codProduto: string;
};

export { IEstoqueItem, IProduto, IProdutoPayload };