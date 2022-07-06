import type { inferAsyncReturnType } from '@trpc/server'
import * as trpc from '@trpc/server'
import * as  z  from 'zod'
import type { OnErrorPayload } from 'trpc-nuxt/api'


/*
import * as PrismaPkg from '@prisma/client'
const {PrismaClient} = PrismaPkg
const client = new PrismaClient()
    .query('getUsers', {
        async resolve(req) {
            // use your ORM of choice
            const users =  await client.user.findMany()
            console.log("from server", users)
            return users
        },
    })

 */


export const router = trpc.router()
    .query('hello',{
        resolve(req) {
        return {
            message: `Hello`
        }
    },
})
