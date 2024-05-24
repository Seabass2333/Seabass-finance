import { z } from 'zod';
import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { zValidator } from '@hono/zod-validator';
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'

import authors from './authors'
import books from './books'

export const runtime = 'edge';

const app = new Hono().basePath('/api')

app.route('/authors', authors)
app.route('/books', books)

app.use('*', clerkMiddleware())

app
  .get(
    '/hello',
    (c) => {
      const auth = getAuth(c)

      if (!auth?.userId) {
        return c.json({
          error: 'you are not authenticated',
        })
      }

      return c.json({
        message: 'Hello  you are login in now!',
        userId: auth.userId,
      })
    })

export const GET = handle(app)
export const POST = handle(app)
