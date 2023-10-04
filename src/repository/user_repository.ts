import { CreateUser } from "dto/user_dto";
import knex from "../config/database";
import { User } from "../entity/user";

const userRepo = knex<User>("users");


export const create = async (req: CreateUser): Promise<User> => {
  return await userRepo.insert(req, ["id", "uuid", "email", "displayName"]);
};
