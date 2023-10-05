import { CreateUser } from "dto/user_dto";
import knex from "../config/database";
import { User } from "../entity/user";

const tableName = "users"


export const create = async (req: CreateUser): Promise<User> => {
  return await knex<User>(tableName).insert(req).returning('*').then((res) => res[0]);
};

export const findFirstByEmail = async (email: string): Promise<User> => {
  return await knex<User>(tableName).where('email', email).select('*').then((res) => res[0])
}
