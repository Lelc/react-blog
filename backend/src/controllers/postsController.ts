import { Request, Response } from "express";
import knex from "../database/connection";

class PostsController {
  async index(request: Request, response: Response) {
    const posts = await knex("posts").select("*");

    const serializedPosts = posts.map((post) => {
      return {
        id: post.id,
        title: post.title,
        image: post.image,
        content: post.content,
        created_at: post.created_at,
        updated_at: post.updated_at,
      };
    });

    return response.json(serializedPosts);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const post = await knex("posts").where("id", id).first();

    if (!post) {
      return response.status(400).json({ message: "Post not found!" });
    }

    return response.json(post);
  }

  async create(request: Request, response: Response) {
    const { title, image, content } = request.body;

    const post = {
      title,
      image,
      content,
    };

    await knex("posts").insert(post);

    return response.json(post);
  }

  async edit(request: Request, response: Response) {
    const { id } = request.params;
    const { title, image, content } = request.body;
    const editTime = new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, "");

    const post = {
      title,
      image,
      content,
      updated_at: editTime,
    };

    await knex("posts").where("id", id).update(post);

    return response.json(post);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.body;

    const post = await knex("posts").where("id", id).del();

    if (!post) {
      return response.status(400).json({ message: "Post not found!" });
    }

    return response.json(post);
  }
}

export default PostsController;
