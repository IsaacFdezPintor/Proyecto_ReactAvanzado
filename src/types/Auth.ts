export type User = {
  id: number;     
  email: string; 
  name: string;   
};

export type AuthSession = {
  token: string;  
  user: User;     
};

// «AuthResponse» es lo que devuelve la API cuando
// llamas a /auth/login o /auth/register.
export type AuthResponse = AuthSession;
