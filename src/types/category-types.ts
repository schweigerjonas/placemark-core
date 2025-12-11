export type Category = {
  title: string;
  userID: string;
  _id: string;
};

export type CategoryDetails = Omit<Category, "_id">;
