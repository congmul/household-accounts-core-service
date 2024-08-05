export interface IBasicCategory {
  name: string;
  icon: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface ICategory extends IBasicCategory {
  userId: string;
  subcategories: IBasicCategory[];
  type: string; // income or expense
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
