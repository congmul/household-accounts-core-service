export interface ICategory {
  userId: string;
  name: string;
  icon: string;
  color: string;
  type: string; // income or expense
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategoryCreatePayload {
  userId: string;
  name: string;
  type: string;
  icon?: string;
  color?: string;
}

export interface ICategoryUpdatePayload {
  type?: string;
  name?: string;
  icon?: string;
  color?: string;
}
