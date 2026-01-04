import { z } from 'zod';
import { PortfolioItemSchema, PortfolioResponseSchema } from './schemas'; 

export type PortfolioItem = z.infer<typeof PortfolioItemSchema>;
export type PortfolioResponse = z.infer<typeof PortfolioResponseSchema>;