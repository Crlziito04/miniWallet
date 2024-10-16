import { userRepository } from "../config/config.mySql";
export const userServices = {
  getAllUsers: async () => {
    try {
      return await userRepository.findAll();
    } catch (error) {
      error;
    }
  },
};
