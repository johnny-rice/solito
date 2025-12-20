import * as z from 'zod'
import { authorized, unauthorized } from '@api/server/procedure'

const PlanetSchema = z.object({
  id: z.number().int().min(1),
  name: z.string(),
  description: z.string().optional(),
})

const users = [
  { id: 1, name: 'Fernando Rojo' },
  { id: 2, name: 'Guillermo Rauch' },
  { id: 4, name: 'Charlie Cheever' },
  {
    id: 3,
    name: 'Evil Rabbit',
  },
  { id: 5, name: 'Evan Bacon' },
  { id: 6, name: 'Shadcn' },
]

export const listUsers = unauthorized
  .input(
    z.object({
      limit: z.number().int().min(1).max(100).optional(),
      cursor: z.number().int().min(0).default(0),
    })
  )
  .handler(async ({ input }) => {
    return users
  })

export const findUser = unauthorized
  .input(PlanetSchema.pick({ id: true }))
  .handler(async ({ input }) => {
    return users.find((user) => user.id === input.id)
  })

export const createUser = authorized
  .input(PlanetSchema.omit({ id: true }))
  .handler(async ({ input, context }) => {
    return { id: 1, name: input.name }
  })

export const router = {
  planet: {
    list: listUsers,
    find: findUser,
    create: createUser,
  },
}
