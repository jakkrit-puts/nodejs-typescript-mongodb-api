import User from "../model/user.model";

export const createUser = async (data: any) => {
  try {
    return await User.create(data);
  } catch (error: any) {
    throw new Error(error);
  }
};
