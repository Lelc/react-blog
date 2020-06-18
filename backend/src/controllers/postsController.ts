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
}

export default PostsController;
