import express, { Request, Response } from "express";

import UsersController from "./controllers/usersController";
import PostsController from "./controllers/postsController";

const routes = express.Router();

const usersController = new UsersController();
const postsController = new PostsController();

routes.get("/users", usersController.index);
routes.get("/users/:id", usersController.show);
routes.post("/users", usersController.create);

routes.get("/posts", postsController.index);
routes.get("/posts/:id", postsController.show);
routes.post("/posts", postsController.create);
routes.delete("/posts", postsController.delete);

export default routes;
