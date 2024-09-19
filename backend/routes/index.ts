import { Hono } from "hono";
import { userRoutes } from "./user";
import { postRoutes } from "./post";

const indexRoute = new Hono(); 

indexRoute.route('/user', userRoutes);
indexRoute.route('/blog', postRoutes);

indexRoute.get('/', (c) => {
    return c.text("welcome to medium-blog");
})

export  { indexRoute };