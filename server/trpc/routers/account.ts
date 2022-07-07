import * as trpc from '@trpc/server'
import * as  z  from 'zod'

import * as PrismaPkg from '@prisma/client'
const {PrismaClient} = PrismaPkg
const client = new PrismaClient()
import * as bcrypt from "bcrypt"
import {TRPCError} from "@trpc/server";


const INITIAL_NETWORKS = ["akash", "cosmoshub", "juno", "evmos", "sentinel", "lumnetwork", "sifchain", "chihuahua", "cerberus"]

const Account = z.object({
    accountConfig: z.object({
        name: z.string().min(1),
        cosmosAddress: z.string(),
        evmosAddress: z.string().optional(),
    }).array(),
    currency: z.enum(["usd", "cad", "eur"]),
    userId: z.number(),
})

export const accountRouter = trpc.router()
    .mutation('create', {
        input: Account,
        async resolve({input}) {
            const account = await client.account.create({data: {
                    currency: input.currency,
                    userId: input.userId,
                    accountConfig: {
                        create: input.accountConfig.map(config => ({
                            name: config.name,
                            cosmosAddress: config.cosmosAddress,
                            evmosAddress: config.evmosAddress,
                        }))
                    }
                }})
            return account
        }
    })


