export type Category = {
  title: string;
  _id: string;
};

export type CategoryDetails = Omit<Category, "_id">;
