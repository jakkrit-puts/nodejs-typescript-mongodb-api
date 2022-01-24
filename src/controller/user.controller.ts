import { createUser } from "../service/user.service";

export const createUserHandler = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);
  } catch (error) {}
};
