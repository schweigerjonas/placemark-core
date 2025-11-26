import axios from "axios";

import { url } from "../fixtures.js";
import { UserDetails } from "../../src/types/user-types.js";

export const service = {
  url: url,

  async createUser(user: UserDetails) {
    const res = await axios.post(`${this.url}/api/user`, user);
    return res.data;
  },
};
