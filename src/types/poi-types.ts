export type Location = {
  lat: string;
  lng: string;
};

export type PointOfInterest = {
  name: string;
  description: string;
  location: Location;
  categoryID: string;
  _id: string;
};

export type PointOfInterestDetails = Omit<PointOfInterest, "_id" | "categoryID">;
