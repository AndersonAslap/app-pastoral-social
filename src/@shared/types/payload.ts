interface ICriarFamiliaPayload {
    nomeRepresentante: string;
    idade: string;
    idComunidade: string | undefined;
    idDificuldade: string | undefined;
    dificuldades: string[];
    cpfRg: string;
    telefone: string;
    endereco: string;
    qtdPessoasResidencia: string;
    qtdPessoasEmpregadas: string;
    criancasFrequentamEscola: boolean;
    membroComProblemaSaude: boolean;
    jaRecebeuAjuda: boolean;
    desejaParticiparCursos: boolean;
    observacao: string;
    outros: string;
}

export {
    ICriarFamiliaPayload
}