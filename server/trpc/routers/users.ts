import * as trpc from '@trpc/server'
import * as  z  from 'zod'

import * as PrismaPkg from '@prisma/client'
const {PrismaClient} = PrismaPkg
const client = new PrismaClient()

const User = z.object({
    name: z.string().min(1),
    username: z.string().email(),
    password: z.string().min(4,{message: 'Password must be between 4 and 24 characters'}).max(24, {message: 'Password must be between 4 and 24 characters'}),
    phone: z.string(),
})




export const userRouter = trpc.router()
    .query('getAll', {
        async resolve(req) {
            // use your ORM of choice
            return await client.user.findMany()
        },
    })
    .query('get', {
        input: z.number(),
        async resolve({input}) {
            return await client.user.findUnique({where: {id: input}})
        }
    })
    .mutation('create', {
        input: User,
        async resolve({input}) {
            // use your ORM of choice
            return await client.user.create({
                data: input
            })
        },
    })
