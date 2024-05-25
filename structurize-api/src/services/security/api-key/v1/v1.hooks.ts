import { v4 as uuid } from 'uuid'
import bcrypt from 'bcryptjs'
import { HookContext } from '../../../../declarations'

export const generateApiKey = (context: HookContext): HookContext => {
  const id = Buffer
    .from(uuid())
    .toString('base64')

  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(id, salt)

  context.params.apiKey = id

  context.data.key = hash

  return context
}

export const setPlainApiKey = (context: HookContext): HookContext => {
  const recordId = Buffer.from(context.result._id.toString()).toString('base64')

  context.result.key = `${recordId}.${context.params.apiKey}`

  return context
}
