import { Request, Response } from "express";
import knex from "../database/connection";

class UsersController {
  async index(request: Request, response: Response) {
    const users = await knex("users").select("*");

    const serializedUsers = users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
      };
    });

    return response.json(serializedUsers);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const user = await knex("users").where("id", id).first();

    if (!user) {
      return response.status(400).json({ message: "User not found!" });
    }

    return response.json(user);
  }

  async create(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const user = {
      name,
      email,
      password,
    };

    await knex("users").insert(user);

    return response.json(user);
  }
}

export default UsersController;
