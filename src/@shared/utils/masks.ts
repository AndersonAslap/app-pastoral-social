export const Masks = {
    // Remove todos os caracteres não numéricos
    onlyNumbers: (value: string) => value.replace(/\D/g, ''),
    
    // CPF: 000.000.000-00
    cpf: (value: string) => {
        const numbers = value.replace(/\D/g, '');
        return numbers
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
            .substring(0, 14);
    },
    
    // RG: 00.000.000-0
    rg: (value: string) => {
        const numbers = value.replace(/\D/g, '');
        return numbers
            .replace(/(\d{2})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1})$/, '$1-$2')
            .substring(0, 13);
    },
    
    // Detector automático de CPF ou RG
    cpfOrRg: (value: string) => {
        const numbers = value.replace(/\D/g, '');
        
        if (numbers.length <= 11) {
            // CPF
            return numbers
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
                .substring(0, 14);
        } else {
            // RG
            return numbers
                .replace(/(\d{2})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d{1})$/, '$1-$2')
                .substring(0, 13);
        }
    },
    
    // Telefone: (00) 0000-0000 ou (00) 00000-0000
    phone: (value: string) => {
        const numbers = value.replace(/\D/g, '');
        
        if (numbers.length <= 10) {
            return numbers
                .replace(/(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{4})(\d)/, '$1-$2')
                .substring(0, 14);
        } else {
            return numbers
                .replace(/(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{5})(\d)/, '$1-$2')
                .substring(0, 15);
        }
    },
    
    // CEP: 00000-000
    cep: (value: string) => {
        const numbers = value.replace(/\D/g, '');
        return numbers
            .replace(/(\d{5})(\d)/, '$1-$2')
            .substring(0, 9);
    },
    
    // Dinheiro: 1.234,56
    money: (value: string) => {
        const numbers = value.replace(/\D/g, '');
        const formatted = (Number(numbers) / 100).toFixed(2);
        return formatted
            .replace('.', ',')
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    },
    
    // Remove a máscara para enviar ao backend
    unmask: (value: string) => value.replace(/\D/g, '')
};