import type { inferAsyncReturnType } from '@trpc/server'
import * as trpc from '@trpc/server'
import type { OnErrorPayload } from 'trpc-nuxt/api'

import { userRouter } from '~/server/trpc/routers/users'
import { authRouter } from '~/server/trpc/routers/auth'
import { accountRouter } from "~/server/trpc/routers/account";



export const router = trpc.router()
    .merge('users.', userRouter)
    .merge('auth.', authRouter)
    .merge('account.', accountRouter)
