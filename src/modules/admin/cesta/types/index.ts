export interface IItemCesta {
  itemProdutoId: number;
  nomeProduto: string;
  quantidade: number;
  unidadeMedida: string;
  valor: number;
}

export interface ICesta {
  idCesta: number;
  identificadorCesta: string;
  descricao: string;
  status: 'CRIADA' | 'RESERVADA' | 'ENTREGUE' | 'CANCELADA';
  totalItensCesta: number;
  progresso: string;
  itens: IItemCesta[];
}

export interface ICestaDados {
  totalCestas: number;
  cestasEntregues: number;
  cestas: ICesta[];
}

export interface StatusConfig {
  color: string;
  bg: string;
  text: string;
  iconColor: string;
  icon: React.ComponentType<any>;
  label: string;
}