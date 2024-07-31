import axios from "axios";
import config from "../config/config";

export const userService = {
  checkExist: async (userId: string) => {
    try {
      await axios.get(`${config.user_service_url}/user/check-exist/${userId}`);
      return true;
    } catch (err: any) {
      return false;
    }
  },
};
