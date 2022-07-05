import * as PrismaPkg from '@prisma/client'
import {defineEventHandler} from "h3";
const {PrismaClient} = PrismaPkg
const client = new PrismaClient()

export default defineEventHandler(async () => {
  const accounts = await client.user.findMany({})
  return {
    accounts
  }
})
