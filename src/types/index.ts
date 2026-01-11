import { z } from 'zod';
import { AdminStockItemSchema, MarketItemSchema, MessageResponseSchema, PortfolioItemSchema, PortfolioResponseSchema, UserSchema } from './schemas'; 

//. Usuario
export type User = z.infer<typeof UserSchema>;

//. Market Item
export type MarketItem = z.infer<typeof MarketItemSchema>;

//. Stocks
export type AdminStockItem = z.infer<typeof AdminStockItemSchema>;


export type MessageResponse = z.infer<typeof MessageResponseSchema>;
export type PortfolioItem = z.infer<typeof PortfolioItemSchema>;
export type PortfolioResponse = z.infer<typeof PortfolioResponseSchema>; 