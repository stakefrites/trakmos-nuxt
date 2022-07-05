import type { inferAsyncReturnType } from '@trpc/server'
import * as trpc from '@trpc/server'
import * as  z  from 'zod'

import * as PrismaPkg from '@prisma/client'
const {PrismaClient} = PrismaPkg
const client = new PrismaClient()

const user = z.object({
    name: z.string(),
})

export const router = trpc.router()
    // queries and mutations...
    .query('hello',{
    // validate input with Zod
    input: z.object({ name: z.string().min(5) }),
        async resolve({input}) {
        // use your ORM of choice
        return {
            message: `Hello ${input.name}`
        }
    },
})
export type Router = typeof router