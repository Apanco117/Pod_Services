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
    role: z.enum(["ADMIN", "USER"]),
    activo: z.boolean(),
    confirmado: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string()
});

export const PortfolioResponseSchema = z.array(PortfolioItemSchema);