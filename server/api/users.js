import * as PrismaPkg from '@prisma/client'
import {defineEventHandler} from "h3";
const {PrismaClient} = PrismaPkg
const client = new PrismaClient()

export default defineEventHandler(async () => {
  const accounts = await client.account.findMany({
    include: {
      portfolios: {
        include: {
          wallets: {
            include: {
              holdings: {
                include: {
                  token: true
                }
              }
            }
          }
        }
      }
    }
  })
  return {
    accounts
  }
})
