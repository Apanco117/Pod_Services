import { z } from 'zod';

export const MessageResponseSchema = z.object({
    message: z.string()
});


export const PortfolioItemSchema = z.object({
    ticker: z.string(),
    nombre: z.string(),
    titulos: z.string(),
    costoTotalSinComision: z.string(),
    comisionesPagadas: z.string(),
    costoPromedio: z.string(),
    costoTotalReal: z.string(),
    precioMercado: z.string(),
    valorActual: z.string(),
    ganancia: z.string(),
    rendimiento: z.string(),
});


//. Usuario 
export const UserSchema = z.object({
    _id: z.string(),
    nombre: z.string(),
    email: z.string(),
    role: z.string(),
    activo: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string()
});

export const MarketItemSchema = z.object({
    ticker: z.string().min(1, "El ticker es obligatorio"),
    nombre: z.string(),
    precio: z.number(),
    variacion: z.number(),
    tipo: z.enum(["TRENDING", "MOST_ACTIVE", "TOP_GAINER", "TOP_LOSER"]).or(z.string()),
    moneda: z.string().length(3).default("USD")
});
export const MarketResponseSchema = z.array(MarketItemSchema);

//. Stocks
export const AdminStockItemSchema = z.object({
    _id: z.string(),
    ticker: z.string(),
    name: z.string(),
    currency: z.string().length(3), 
    lastPrice: z.number(),
    isSystemTracked: z.boolean(),
    totalDataPoints: z.number().int().nonnegative(),
    updatedAt: z.string().datetime(),
    lastCandleDate: z.string().datetime().nullable().optional() 
});

export const AdminStockResponseSchema = z.array(AdminStockItemSchema);

export const StockChangeSchema = z.object({
    amount: z.number(),
    percentage: z.number(),
    direction: z.enum(['up', 'down']).or(z.string()) 
});

export const StockRangeValuesSchema = z.object({
    low: z.number(),
    high: z.number(),
    current: z.number()
});

export const StockStatisticsSchema = z.object({
    volume: z.number().optional().nullable(),
    marketCap: z.number().optional().nullable(),
    previousClose: z.number()
});

export const StockDetailSchema = z.object({
    symbol: z.string(),
    name: z.string(),
    price: z.number(),
    currency: z.string(),
    lastUpdate: z.string().datetime(),
    change: StockChangeSchema,
    ranges: z.object({
        day: StockRangeValuesSchema,
        year: StockRangeValuesSchema
    }),
    statistics: StockStatisticsSchema
});


//. Monitor de eventos
export const LogConexionItemSchema = z.object({
    _id: z.string(),
    socketId: z.string(),
    evento: z.enum(["CONECTADO", "DESCONECTADO", "ERROR", "TIMEOUT"]), 
    ip: z.string(),
    mensaje: z.string(),
    fecha: z.string(), 
    __v: z.number()
});

export const LogConexionResponseSchema = z.object({
    success: z.boolean(),
    total: z.number(),
    data: z.array(LogConexionItemSchema)
});


export const UsersSchema = z.array(UserSchema)

export const PortfolioResponseSchema = z.array(PortfolioItemSchema);