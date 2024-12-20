// types/user.ts
export interface User {
  id: string;
  email: string;
  user_metadata?: {
    avatar_url?: string;
  };
}
