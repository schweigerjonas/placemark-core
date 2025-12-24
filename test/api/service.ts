import axios from "axios";

import { url } from "../fixtures.js";
import { User, UserDetails } from "../../src/types/user-types.js";
import { PointOfInterestDetails } from "../../src/types/poi-types.js";
import { CategoryDetails } from "../../src/types/category-types.js";

export const service = {
  url: url,

  async authenticate(user: User) {
    const response = await axios.post(`${this.url}/api/users/authenticate`, user);
    axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common.Authorization = "";
  },

  // User API methods
  async createUser(user: UserDetails) {
    const res = await axios.post(`${this.url}/api/users`, user);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.url}/api/users`);
    return res.data;
  },

  async getUser(id: string) {
    const res = await axios.get(`${this.url}/api/users/${id}`);
    return res.data;
  },

  async updateUser(id: string, userDetails: UserDetails) {
    const res = await axios.put(`${this.url}/api/users/${id}`, userDetails);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.url}/api/users`);
    return res.data;
  },

  async deleteUser(id: string) {
    const res = await axios.delete(`${this.url}/api/users/${id}`);
    return res;
  },

  // Category API methods
  async createCategory(userID: string, category: CategoryDetails) {
    const res = await axios.post(`${this.url}/api/users/${userID}/categories`, category);
    return res.data;
  },

  async getAllCategories() {
    const res = await axios.get(`${this.url}/api/categories`);
    return res.data;
  },

  async getCategory(id: string) {
    const res = await axios.get(`${this.url}/api/categories/${id}`);
    return res.data;
  },

  async updateCategory(id: string, categoryDetails: CategoryDetails) {
    const res = await axios.put(`${this.url}/api/categories/${id}`, categoryDetails);
    return res.data;
  },

  async deleteAllCategories() {
    const res = await axios.delete(`${this.url}/api/categories`);
    return res.data;
  },

  async deleteCategory(id: string) {
    const res = await axios.delete(`${this.url}/api/categories/${id}`);
    return res;
  },

  // POI API methods
  async createPOI(categoryID: string, poi: PointOfInterestDetails) {
    const res = await axios.post(`${this.url}/api/categories/${categoryID}/pois`, poi);
    return res.data;
  },

  async getAllPOIs() {
    const res = await axios.get(`${this.url}/api/pois`);
    return res.data;
  },

  async getPOI(id: string) {
    const res = await axios.get(`${this.url}/api/pois/${id}`);
    return res.data;
  },

  async updatePOI(id: string, poiDetails: PointOfInterestDetails) {
    const res = await axios.put(`${this.url}/api/pois/${id}`, poiDetails);
    return res.data;
  },

  async deleteAllPOIs() {
    const res = await axios.delete(`${this.url}/api/pois`);
    return res.data;
  },

  async deletePOI(id: string) {
    const res = await axios.delete(`${this.url}/api/pois/${id}`);
    return res;
  },
};
