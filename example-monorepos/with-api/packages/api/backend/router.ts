import * as z from 'zod'
import { authorized, unauthorized } from 'api/backend/procedure'

const UserSchema = z.object({
  id: z.number().int().min(1),
  name: z.string(),
})

const users: z.infer<typeof UserSchema>[] = [
  { id: 1, name: 'Fernando Rojo' },
  { id: 2, name: 'Guillermo Rauch' },
  { id: 4, name: 'Charlie Cheever' },
  { id: 3, name: 'Evil Rabbit' },
  { id: 5, name: 'Evan Bacon' },
  { id: 6, name: 'Shadcn' },
]

export const router = {
  user: {
    list: unauthorized
      .input(
        z.object({
          limit: z.number().int().min(1).max(100).optional(),
          cursor: z.number().int().min(0).default(0),
        })
      )
      .handler(async ({ input }) => {
        return users
      }),
    find: unauthorized
      .input(UserSchema.pick({ id: true }))
      .handler(async ({ input }) => {
        return users.find((user) => user.id === input.id)
      }),
    create: authorized.handler(async ({ input, context }) => {
      return { id: 1, name: context.user.name }
    }),
  },
}
