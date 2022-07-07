import * as trpc from '@trpc/server'
import * as  z  from 'zod'

import * as PrismaPkg from '@prisma/client'
const {PrismaClient} = PrismaPkg
const client = new PrismaClient()
import * as bcrypt from "bcrypt"
import {TRPCError} from "@trpc/server";

const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10)
}

const comparePassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash)
}

const Login = z.object({
    username: z.string(),
    password: z.string().min(4,{message: 'Password must be between 4 and 24 characters'}).max(24, {message: 'Password must be between 4 and 24 characters'}),
})

const Signup = z.object({
    username: z.string(),
    password: z.string().min(4,{message: 'Password must be between 4 and 24 characters'}).max(24, {message: 'Password must be between 4 and 24 characters'}),
    confirmPassword: z.string().min(4,{message: 'Password must be between 4 and 24 characters'}).max(24, {message: 'Password must be between 4 and 24 characters'}),
})



export const authRouter = trpc.router()
    .query('login', {
        input: Login,
        async resolve(req) {
            const {username, password} = req.input
            const user = await client.user.findUnique({where: {username}})
            if (!user) {
                throw new TRPCError({message: 'User not found', code: "NOT_FOUND"})
            }
            const isValid = await comparePassword(password, user.password || "")
            if (!isValid) {
                throw new TRPCError({message: 'You are not authorized', code: "UNAUTHORIZED"})
            }
            return {
                user
            }
        },
    })
    .mutation('signup', {
        input: Signup,
        async resolve({input}) {
            const {username, password, confirmPassword} = input
            if (password !== confirmPassword) {
                throw new TRPCError({message: 'Passwords do not match', code: "BAD_REQUEST"})
            }
            const user = await client.user.findUnique({where: {username}})
            if (user) {
                return user;
            }
            const hash = await hashPassword(password)
            const newUser = await client.user.create({
                data: {
                    username,
                    password: hash,
                }
            })
            return {
                user: newUser
            }
        }
    })


