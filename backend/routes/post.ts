import { Hono } from "hono";
import { createBlog, getAllBlog, getBlogById, updateBlog } from "../middlewares/blogMiddleware";

const postRoutes = new Hono<{
    Bindings: {
      JWT_SECRET: String  
    },
    Variables: {
        "token": String
    }
}>();

//welcome route
postRoutes.get('/', (c) => {
    return c.text("welcome to medium-blog");
})

//create blog
postRoutes.post('/blog', createBlog, async (c) => {
    return c.json({
        message: "Blog created"
    }, 201)
})

//update blog
postRoutes.put('/blog', updateBlog, (c) => {
    return c.json({
        message: "Blog updated"
    }, 200)
})

//get blog by id
postRoutes.get('/blog/:id', getBlogById);

//get all blogs
postRoutes.get('/blogs', getAllBlog);

export { postRoutes };