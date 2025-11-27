interface IEstoqueItem {
    id: number;
    nome: string;
    quantidadeEstoque: number;
}

interface IProduto {
    validade: Date | null;
    itemProdutoId: string;
    quantidade: number;
};

export { IEstoqueItem, IProduto };