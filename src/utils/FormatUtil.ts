export const formatCurrency = (value: number | string) => {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 2
    }).format(Number(value));
};

export const formatPercentage = (value: number) => `${value.toFixed(2)}%`;

export const formatCompact = (val: number | undefined | null) => {
    if (!val) return "—";
    return new Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: 2,
    }).format(val);
};

export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-MX", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    })
}

export const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("es-MX", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });
};