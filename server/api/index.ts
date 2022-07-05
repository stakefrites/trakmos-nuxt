import * as PrismaPkg from '@prisma/client'
import {defineEventHandler} from "h3";
const {PrismaClient} = PrismaPkg
const client = new PrismaClient()


export default defineEventHandler((event) => {
    return {
        api: 'works'
    }
})