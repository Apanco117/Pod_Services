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
    confirmado: z.boolean(),
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


export const UsersSchema = z.array(UserSchema)

export const PortfolioResponseSchema = z.array(PortfolioItemSchema);