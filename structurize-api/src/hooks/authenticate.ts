import { HookContext } from '@feathersjs/feathers'
import { NotAuthenticated, NotFound } from '@feathersjs/errors'
import jwt from 'jsonwebtoken'

declare module '@feathersjs/feathers' {
  interface Params {
    user?: { _id: string; accountId: string; roleName: string }
  }
}

export const authenticate = (config?: { freshTokenRequired: boolean }) => {
  return (context: HookContext): HookContext => {
    const { app, params } = context
    const token = params?.headers?.authorization

    if (!params.provider) {
      return context
    }

    if (!token) {
      throw new NotAuthenticated('Missing token')
    }

    try {
      jwt.verify(token, app.get('jwtSecret'))
    } catch (e) {
      if (e instanceof Error) {
        if (e.message === 'invalid signature') {
          throw new NotAuthenticated('Invalid token')
        }

        if (e.message === 'jwt expired' && config?.freshTokenRequired) {
          throw new NotAuthenticated('Token expired')
        }
      }
    }

    const decoded = jwt.decode(token)

    if (!decoded || typeof decoded === 'string') {
      throw new NotAuthenticated('Invalid token')
    }

    context.params.user = { _id: decoded.userId, roleName: decoded.roleName, accountId: decoded.accountId }

    return context
  }
}
