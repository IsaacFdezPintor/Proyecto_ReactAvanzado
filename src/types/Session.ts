export type SessionStatus = "pendiente" | "confirmada" | "completada" | "cancelada";

export type PhotoSession = {
  id: number;            
  title: string;         
  client: string;        
  category: string;      
  date: string;          
  location: string;      
  price: number;         
  status: SessionStatus; 
  notes: string;         
};