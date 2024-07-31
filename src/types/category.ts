export interface ICategory {
  userId: string;
  name: string;
  icon: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategoryCreatePayload {
  userId: string;
  name: string;
  icon?: string;
  color?: string;
}

export interface ICategoryUpdatePayload {
  name?: string;
  icon?: string;
  color?: string;
}
