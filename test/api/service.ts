import axios from "axios";

import { url } from "../fixtures.js";
import { UserDetails } from "../../src/types/user-types.js";

export const service = {
  url: url,

  // User API methods
  async createUser(user: UserDetails) {
    const res = await axios.post(`${this.url}/api/user`, user);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.url}/api/user`);
    return res.data;
  },

  async getUser(id: string) {
    const res = await axios.get(`${this.url}/api/user/${id}`);
    return res.data;
  },

  async updateUser(id: string, userDetails: UserDetails) {
    const res = await axios.put(`${this.url}/api/user/${id}`, userDetails);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.url}/api/user`);
    return res.data;
  },

  async deleteUser(id: string) {
    const res = await axios.delete(`${this.url}/api/user/${id}`);
    return res.data;
  },
};
