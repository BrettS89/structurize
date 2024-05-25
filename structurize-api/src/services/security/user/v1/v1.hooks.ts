import { HookContext } from '@feathersjs/feathers'
import { BadRequest, GeneralError } from '@feathersjs/errors'
import bcrypt from 'bcryptjs'

export const hashPassword = (context: HookContext) => {
  const { data } = context

  if (!data.password) {
    throw new BadRequest('Missing password')
  }

  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(data.password, salt)

  data.password = hash

  return context
}

export const setRole = async (context: HookContext) => {
  const { app, data } = context

  const foundRole = await app.service('security/role/v1').find({
    query: {
      name: 'user'
    }
  })

  const role = foundRole.data[0]

  if (!role) {
    throw new GeneralError()
  }

  data.roleId = role._id

  return context
}
