import { PrismaClient } from "@prisma/client/edge.js";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

const blogRoutes = new Hono<{
    Bindings: {
      DATABASE_URL:string,
      JWT_SECRET:string
    },
    Variables: {
        userId:string
    }
  }>()

// Middlewares for every blog access
blogRoutes.use("/*", async (c,next)=> {
   try{
    const token = c.req.header("authorization")?.split(" ")[1] || "";

    const user = await verify(token,c.env.JWT_SECRET)
    
    if(!!user.userId) {
        c.set("userId",user.userId as string);
       await next();
    }else {
    return c.json({message:"Please Login before accessing blogs"},403);
    }
   }catch(er){
    return c.json({message:"Please Login before accessing blogs"},403);
   }
})

blogRoutes.post('/',async (c) => {
  try {
    const body = await c.req.json();

    const authorId = c.get("userId") || "";

    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const blog = await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId: authorId
        }
    });

    if(!!blog) {
        return c.json({message:"Blog Successfully posted",content:blog},201)
    }else {
        return c.json({message:"Blog posting failed"},411)
    }

  }catch{
    return c.json({message:"Blog posting failed"},411)
  }    
})

blogRoutes.put('/:id',async (c) => {
  try {
    const body = await c.req.json();

    const blogId = c.req.param()?.id || "";

    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const blog = await prisma.post.update({
      where: {
        id:blogId
      },
        data:{
            title:body.title,
            content:body.content,
        }
    });

    if(!!blog) {
        return c.json({message:"Blog Successfully Updated", content:blog },201)
    }else {
        return c.json({message:"Blog updating failed"},411)
    }

  }catch{
    return c.json({message:"Blog updating failed"},411)
  }    
})
  
blogRoutes.get('/:id', async (c) => {
    try {
      const blogId = c.req.param() || "";

      const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
      }).$extends(withAccelerate())
  
      const blog = await prisma.post.findFirst({
          where:{
            id : blogId.id 
          }
      });

      if(!!blog) {
          return c.json({content:blog},200)
      }else {
          return c.json({message:"Blog not found"},411)
      }
  
    }catch{
      return c.json({message:"Blog not found"},411)
    }    
  })

  // Add pagination Later
  blogRoutes.get('/', async (c) => {
    try {
  
      const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
      }).$extends(withAccelerate())
  
      const blogs = await prisma.post.findMany({});
  
      if(!!blogs) {
          return c.json({content:blogs},200)
      }else {
          return c.json({message:"Blog not found"},411)
      }
  
    }catch{
      return c.json({message:"Blog not found"},411)
    }    
  })


export default blogRoutes;