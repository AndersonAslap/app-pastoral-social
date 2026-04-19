import emptyAnimation from "@assets/animations/empty-list.json";

export const useEmptyStateConfig = (entity: string) => {
    const configs = {
        default: {
            animation: emptyAnimation,
            title: `Nenhuma ${entity} cadastrada`,
            description: `Adicione uma nova ${entity} para vê-la aqui na lista.`
        }
    } as const;

    return configs.default;
};