import { Hono } from "hono";
import { decode, verify } from "hono/jwt";
import { allUsers, signinAuth, signupAuth } from "../middlewares/userMiddleware";

const userRoutes = new Hono<{
    Bindings: {
      JWT_SECRET: String  
    },
    Variables: {
        "token": String
    }
}>();

userRoutes.get('/', (c) => {
    return c.text("hello user");
})  


userRoutes.post('/signup', signupAuth, async (c) => {
    return c.json({
        token: c.get("token")
    }, 201)
})

userRoutes.post('/signin', signinAuth, async (c) => { 
        return c.json({
            token: c.get("token"),
        }, 200)
})

//return all users
userRoutes.get('/users', allUsers)


export { userRoutes };