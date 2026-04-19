interface IResponseListarFamilias {
    id: number;
    nomeRepresentante: string;
    telefone: string;
    endereco: string;
    qtdPessoasResidencia: number;
    qtdPessoasEmpregadas: number;
    comunidade: string;
    criancasFrequentamEscola: boolean;
}

export {
    IResponseListarFamilias
}