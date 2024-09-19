import { Context, Next } from "hono";

export const customMiddleware = async (c: Context, next: Next) => {
    try {
        return c.text("hello from middlewares");
        
    }catch(e){
        await next();
    }
}

//next or () => Promise<void>