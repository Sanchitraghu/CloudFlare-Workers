import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge.js'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'


const app = new Hono<{
  Bindings: {
    DATABASE_URL:string,
    JWT_SECRET:string
  }
}>()

// Middlewares 

app.use("/api/v1/blog/*", async (c,next)=> {
   try{
    const token = c.req.header("authorization")?.split(" ")[1] || "";

    const user = await verify(token,c.env.JWT_SECRET)
    
    if(!!user.userId) {
        next();
    }else {
    return c.json({message:"Error in getting blog"},403);
    }
   }catch(er){
    return c.json({message:"Error in getting blog"},403);
   }
})


app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/api/v1/signup',async (c) => {

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
})

app.post('/api/v1/signin', (c) => {
  return c.text('Hello Hono!')
})

app.post('/api/v1/blog', (c) => {
  return c.text('Hello Hono!')
})

app.get('/api/v1/blog/:id', (c) => {
  return c.text('Hello Hono!')
})

export default app;
