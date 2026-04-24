const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
};

const getExpiryStatus = (dateString: string): string => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expiryDate = new Date(dateString);
    expiryDate.setHours(0, 0, 0, 0);
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "expired";
    if (diffDays <= 7) return "warning";
    if (diffDays <= 30) return "attention";
    return "normal";
};

const getDaysDifference = (dateString: string): number => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expiryDate = new Date(dateString);
    expiryDate.setHours(0, 0, 0, 0);
    const diffTime = expiryDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const formatarNumero = (numero: number): string => {
    return numero.toLocaleString('pt-BR');
};

const getImage = (tipo: string) => {
    switch (tipo) {
      case "Cestas Básicas":
        return "🛒";
      case "Refeições":
        return "🍽️";
      case "Doação Roupas":
        return "🧥";
      default:
        return "👨‍👩‍👧‍👦";
    }
  }

export {
    formatarNumero,
    formatDate,
    getExpiryStatus,
    getDaysDifference,
    getImage
}