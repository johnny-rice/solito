import * as z from 'zod'
import { authorized, unauthorized } from 'api/backend/procedure'
import { nextjsContext } from 'api/backend/nextjs-context'

const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
})

const users: z.infer<typeof UserSchema>[] = [
  { id: '1', name: 'Fernando Rojo' },
  { id: '2', name: 'Guillermo Rauch' },
  { id: '3', name: 'Charlie Cheever' },
  { id: '4', name: 'Evil Rabbit' },
  { id: '5', name: 'Evan Bacon' },
  { id: '6', name: 'Shadcn' },
  { id: '7', name: 'James Ide' },
  { id: '8', name: 'Tom Occhino' },
]

const actionable = {
  context: nextjsContext,
}

export const router = {
  user: {
    list: unauthorized
      .handler(async () => {
        return users
      })
      .actionable(actionable),
    find: unauthorized
      .input(UserSchema.pick({ id: true }))
      .handler(async ({ input }) => {
        return users.find((user) => user.id === input.id)
      })
      .actionable(actionable),
    create: authorized
      .handler(async ({ input, context }) => {
        return { id: 1, name: context.user.name }
      })
      .actionable(actionable),
  },
}
