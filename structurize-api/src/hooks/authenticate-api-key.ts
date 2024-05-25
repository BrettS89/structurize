import bcrypt from 'bcryptjs'
import { NotAuthenticated } from '@feathersjs/errors';
import { HookContext } from '../declarations';

export const authenticateApiKey = async (context: HookContext): Promise<HookContext> => {
  const { app, params } = context
    const token = params?.headers?.authorization

    if (!params.provider || params.user?.roleName === 'developer') {
      return context
    }

    if (!token) {
      throw new NotAuthenticated('Missing token')
    }

    const [id, code] = token.split('.')

    const decodedId = Buffer.from(id, 'base64').toString('utf-8')

    let apiKeyRecord

    try {
      apiKeyRecord = await app.service('security/api-key/v1').get(decodedId)
    } catch {
      throw new NotAuthenticated()
    }

    if (!bcrypt.compareSync(code, apiKeyRecord?.key)) {
      throw new NotAuthenticated()
    }

    context.params.user = { accountId: apiKeyRecord.accountId }

  return context
}
