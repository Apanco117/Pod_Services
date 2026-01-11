import { z } from 'zod';
import { AdminStockItemSchema, MarketItemSchema, MessageResponseSchema, PortfolioItemSchema, PortfolioResponseSchema, StockChangeSchema, StockDetailSchema, StockRangeValuesSchema, UserSchema } from './schemas'; 

//. Usuario
export type User = z.infer<typeof UserSchema>;

//. Market Item
export type MarketItem = z.infer<typeof MarketItemSchema>;

//. Stocks
export type AdminStockItem = z.infer<typeof AdminStockItemSchema>;
export type StockDetail = z.infer<typeof StockDetailSchema>;
export type StockChange = z.infer<typeof StockChangeSchema>;
export type StockRange = z.infer<typeof StockRangeValuesSchema>;

export type MessageResponse = z.infer<typeof MessageResponseSchema>;
export type PortfolioItem = z.infer<typeof PortfolioItemSchema>;
export type PortfolioResponse = z.infer<typeof PortfolioResponseSchema>; 