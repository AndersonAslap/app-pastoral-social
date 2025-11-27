export type ItemCesta = {
  nome: string;
  quantidade: number;
}

export type ModeloTemplateCesta = {
  idTemplate: number;
  descricao: string;
  qtdPossivelGeracao: number;
  items: ItemCesta[];
}

export type Product = {
  id: number;
  nome: string;
  quantidadeEstoque: number;
  unidadeMedida?: string;
};

export type TemplateItem = {
  itemProdutoId: string;
  quantidade: number;
};

export type TemplateForm = {
  qtdGeracaoPossivel: number;
  templateDesc: string;
  templateType: string | undefined;
  gerarCestas: boolean;
  templateItens: TemplateItem[];
};

export type EstoqueStatus = {
  status: "sem-estoque" | "insuficiente" | "exato" | "suficiente";
  color: string;
};