import { z } from 'zod';

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

export const PortfolioResponseSchema = z.array(PortfolioItemSchema);