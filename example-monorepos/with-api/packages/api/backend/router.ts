import * as z from 'zod'
import { authorized, unauthorized } from 'api/backend/procedure'
import { InferRouterInputs, InferRouterOutputs } from '@orpc/server'

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

export const router = {
  user: {
    list: unauthorized.handler(() => users),
    find: unauthorized
      .input(UserSchema.pick({ id: true }))
      .handler(({ input }) => {
        console.log('find', input)
        const user = users.find((user) => user.id === input.id)
        console.log('user', user)
        return user
      }),
    create: authorized.handler(({ context }) => ({
      id: users.length + 1,
      name: context.user.name,
    })),
  },
}

export type RouterOut = InferRouterOutputs<typeof router>
export type RouterIn = InferRouterInputs<typeof router>
