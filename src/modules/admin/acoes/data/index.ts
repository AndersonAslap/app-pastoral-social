import { AcaoSocial } from "../types";

export const mockAcoesSociais: AcaoSocial[] = [
  {
    id: 1,
    nome: "Distribuição de Cestas Básicas - Centro",
    descricao: "Distribuição mensal de cestas básicas para famílias carentes da região central",
    data: "2024-01-20",
    local: "Praça Central",
    itensArrecadacao: ["Arroz", "Feijão", "Óleo", "Açúcar", "Macarrão"],
    status: "planejada"
  },
  {
    id: 2,
    nome: "Campanha do Agasalho - Inverno",
    descricao: "Arrecadação de agasalhos e cobertores para moradores de rua",
    data: "2024-01-18",
    local: "Centro Comunitário da Zona Norte",
    itensArrecadacao: ["Casacos", "Calças", "Cobertores", "Meias", "Luvas"],
    status: "em_andamento"
  },
  {
    id: 3,
    nome: "Ação de Natal - Comunidade Vila Nova",
    descricao: "Distribuição de brinquedos e cestas de natal para crianças carentes",
    data: "2024-01-15",
    local: "CRAS Vila Nova",
    itensArrecadacao: ["Brinquedos", "Roupas infantis", "Doces", "Leite", "Panetone"],
    status: "concluida"
  },
  {
    id: 4,
    nome: "Mutirão de Higiene Pessoal",
    descricao: "Distribuição de kits de higiene para famílias em situação de vulnerabilidade",
    data: "2024-01-22",
    local: "Parque Municipal",
    itensArrecadacao: ["Sabonete", "Shampoo", "Pasta de dente", "Escova dental", "Absorventes"],
    status: "planejada"
  },
  {
    id: 5,
    nome: "Ação Emergencial - Enchente",
    descricao: "Arrecadação emergencial para famílias afetadas pelas enchentes",
    data: "2024-01-12",
    local: "Terminal Rodoviário",
    itensArrecadacao: ["Água mineral", "Alimentos não perecíveis", "Roupas", "Produtos de limpeza"],
    status: "cancelada"
  }
];