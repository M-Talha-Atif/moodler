// src/types/experience.ts - 
export interface Experience {
  id: string;
  title: string;
  description: string;
  price: number;
  image?: string;
  isVirtual: boolean;
  isBooked: boolean;
  spotsFilled: number;
  totalSpots: number;
  date: string;
  location: string;
  culture?: string;
  emotion?: string;
  outcome?: string;
  duration?: number;
  host?: {
    id: string;
    name: string;
    avatar?: string;
  };
}