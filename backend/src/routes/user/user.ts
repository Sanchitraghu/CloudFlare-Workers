import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge.js'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'

const userRoute = new Hono<{
    Bindings: {
      DATABASE_URL:string,
      JWT_SECRET:string
    }
  }>()

//  Sign Up Route For Userr
userRoute.post('/signup',async (c) => {
    try{
      const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
      }).$extends(withAccelerate())
    
      const body = await c.req.json();
    
     const user = await prisma.user.create({
        data: {
          email:body.email,
          password: body.password,
        }
      })
      
      const token = await sign({userId:user.id},c.env.JWT_SECRET);
    
      return c.json({
        jwt: token
      })
    
    }catch {
    return c.json({message:"Error in singing Up"},400);
    }
     
    })
    
    // SignIn Route for user
    userRoute.post('/signin', async (c) => {
      try{
        const prisma = new PrismaClient({
          datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate())
      
        const body = await c.req.json();
      
       const existingUser = await prisma.user.findFirst({
          where: {
            email:body.email,
          }
        })
    
        if(!existingUser) {
          return c.json({message:"Error in singing in"},400);
        }
        
        const token = await sign({userId:existingUser.id},c.env.JWT_SECRET);
      
        return c.json({
          jwt: token
        })
      
      }catch {
      return c.json({message:"Error in singing in"},400);
      }
    })

export default userRoute;