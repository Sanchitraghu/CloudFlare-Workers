import { Hono } from 'hono'
import {blogRoutes, userRoute} from './routes'


const app = new Hono()

app.route("/api/v1/user",userRoute);
app.route("/api/v1/blog",blogRoutes);

app.get('/', (c) => {
  return c.json({message: "Welcome to the most viewed blog website!!"});
})

export default app;
