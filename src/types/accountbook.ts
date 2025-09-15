export interface IAccountBook {
  name: string;
  userList: {
    userId: string;
    role: "owner" | "editor" | "viewer";
  }[];
  createdAt: Date;
  updatedAt: Date;
}
