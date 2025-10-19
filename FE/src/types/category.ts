export interface Category {
    id: number;
    name: string;
    slug: string;
    parentId?: number | null;
    description: string | null;
    createdAt: string; 
    updatedAt?: string; 
  }

  export interface CategoryRes {
    name: string;
    slug: string;
    parentId?: number | null;
    description: string | null;
  }