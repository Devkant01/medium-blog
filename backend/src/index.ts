import { Hono } from 'hono'
import {indexRoute } from '../routes/index'
import { cors } from 'hono/cors';

const app = new Hono()

app.use('/*',cors())
app.route('/medium-blog', indexRoute);

app.get('/', (c) => {
  return c.text('Hello User!')
})

app.use('/*', async (c, next) => {
  return c.json({
    msg: "routes un-handled"
  }, 404)
})


export default app
