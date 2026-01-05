import { z } from 'zod';
import { MessageResponseSchema, PortfolioItemSchema, PortfolioResponseSchema, UserSchema } from './schemas'; 

//. Usuario
export type User = z.infer<typeof UserSchema>;


export type MessageResponse = z.infer<typeof MessageResponseSchema>;
export type PortfolioItem = z.infer<typeof PortfolioItemSchema>;
export type PortfolioResponse = z.infer<typeof PortfolioResponseSchema>;