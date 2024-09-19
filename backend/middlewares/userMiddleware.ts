import { sign } from "hono/jwt";
import { Context, Next } from "hono"; 
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { signinInput, signupInput, signupType } from "@devkant01/zodvalidation";

export const signupAuth = async (c: Context, next: Next) => {
    try{
        const prisma = new PrismaClient({
        // // @ts-ignore //this will ignore the ts error
        datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
        const body = await c.req.json();
        const success = signupInput.safeParse(body);
        if (!success.success) {
            return c.json({
                msg: "invalid input",
                error: success.error
            }, 400)
        }
        const userExists = await prisma.user.findFirst({
            where: {
                email: body.email
            }
        })
        if (userExists) {
            return c.json({
                msg: "user already exists"
            }, 400)
        }
        const user = await prisma.user.create({
            data: {
            name: body.name ?? "undefined",
            email: body.email,
            password: body.password,
        },
        })
        if (!user) {
            return c.json({
                msg: "Error from db"
            }, 500)   
        }
        const token = await sign({ id: user.id, name: user.name }, c.env.JWT_SECRET);
        c.set("token", token);
        await next();
    }catch (e) {
    console.log(e)
  }
};

export const signinAuth = async (c: Context, next: Next) => {
    try {
    const prisma = new PrismaClient({
      // // @ts-ignore //this will ignore the ts error
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json();
    const user = await prisma.user.findFirst({
        where: {
            email: body.email
        }
    })
    if (!user) {
        return c.json({
            msg: "user does not exists"
        }, 400)
    }
    const token = await sign({ id: user.id, name: user.name }, c.env.JWT_SECRET);
    c.set("token", token);
    await next();
  } catch (e) {
    console.log(e)
  }
};

export const allUsers = async (c: Context, next: Next) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate());
        const users =await prisma.user.findMany({
            select: {
                id: true,
                email: true
            }
        })
        return c.json({
            total: users.length,
            users: users.map((user) => {
                return {
                    id: user.id
                }
            }, 300)
        })
    } catch (e) {
        return c.json({
            msg: "something wrong happened",
            error: e
        })
    }
}