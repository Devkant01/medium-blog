import { Context, Next } from "hono";
import { verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export const createBlog = async (c: Context, next: Next) => {
    try {
        const token = await c.req.header("Authorization") || "";
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
        const body = await c.req.json();
        const user = await verify(token, c.env.JWT_SECRET);
        const blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: `${user.id}`
            }
        });
        await next();
    } catch (e) {
        return c.json({
            message: (e instanceof Error) ? e.message : 'An unknown error occurred'
        }, 500)
    }
}

export const updateBlog = async (c: Context, next: Next) => {
    try {
        const id = c.req.param("id");
        const body = await c.req.json();
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
        await prisma.post.update({
            where: {
                id: id
            },
            data: {
                title: body.title,
                content: body.content
            }
        });
        await next();
    } catch (e) {
        return c.json({
            message: e
        }, 500)
    }
}

export const getBlogById = async (c: Context, next: Next) => {
    try {
        const id = await c.req.param("id");
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
        const blog = await prisma.post.findFirst({
            where: {
                id: id
            }
        });
        return c.json(blog, 200);
    } catch (e) {
        return c.json({
            message: e
        }, 500)
    }
}

export const getAllBlog = async (c: Context, next: Next) => {
    try {
        const token = await c.req.header("Authorization") || "";
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
        const user = await verify(token, c.env.JWT_SECRET);
        const blog = await prisma.post.findMany({
            where: {
                authorId: `${user.id}`
            }
        });
        return c.json(blog, 201);
        // await next();
    } catch (e) {
        return c.json({
            message: e
        }, 500)
    }
}