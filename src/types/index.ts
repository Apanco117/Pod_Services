import { z } from 'zod';
import { AdminStockItemSchema, DeleteEquipoResponseSchema, EquipoFormSchema, EquipoItemSchema, EquiposResponseSchema, LiveConnectionItemSchema, LiveConnectionResponseSchema, LogConexionItemSchema, LogConexionResponseSchema, MarketItemSchema, MessageResponseSchema, PortfolioItemSchema, PortfolioResponseSchema, StockChangeSchema, StockDetailSchema, StockRangeValuesSchema, UserSchema } from './schemas'; 

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


//. Monitor
export type LogConexionResponse = z.infer<typeof LogConexionResponseSchema>;
export type LogConexion = z.infer<typeof LogConexionItemSchema>;

export type LiveConnectionItem = z.infer<typeof LiveConnectionItemSchema>;
export type LiveConnectionResponse = z.infer<typeof LiveConnectionResponseSchema>;

//. Equipos
export type EquipoItem = z.infer<typeof EquipoItemSchema>;
export type EquiposResponse = z.infer<typeof EquiposResponseSchema>;
export type EquipoResponse = z.infer<typeof EquipoFormSchema>;
export type EquipoFormData = z.infer<typeof EquipoFormSchema>;
export type DeleteEquipoResponse = z.infer<typeof DeleteEquipoResponseSchema>;
export type MonitorFilters = {
    date?: string;
    event?: string;
    ip?: string;
}
