// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#custom-services
import type { Params } from '@feathersjs/feathers'
import { NotFound, NotAuthenticated } from '@feathersjs/errors'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import type { Application } from '../../../../declarations'
import type {
  SecuritySessionV1,
  SecuritySessionV1Data,
  SecuritySessionV1Patch,
  SecuritySessionV1Query
} from './v1.schema'

export type { SecuritySessionV1, SecuritySessionV1Data, SecuritySessionV1Patch, SecuritySessionV1Query }

export interface SecuritySessionV1ServiceOptions {
  app: Application
}

export interface SecuritySessionV1Params extends Params<SecuritySessionV1Query> {}

// This is a skeleton for a custom service class. Remove or add the methods you need here
export class SecuritySessionV1Service {
  app: any

  constructor(app: any) {
    this.app = app
  }

  async create(data: Record<string, any>) {
    const { email, password } = data

    const user: Record<string, any> = (
      await this.app.service('security/user/v1').find({
        query: {
          email
        },
        paginate: false
      })
    )[0]

    if (!user) {
      throw new NotFound('Email not found')
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new NotAuthenticated('invalidCredentials')
    }

    const role = await this.app.service('security/role/v1').get(user.roleId)

    const token = jwt.sign(
      { userId: user._id, accountId: user.accountId, roleName: role.name },
      this.app.get('jwtSecret')
    )

    return { user, token }
  }

  async find(params: Params): Promise<Record<string, any>> {
    if (!params.user) throw new Error('An error occured')

    return {
      message: 'ok'
    }
  }
}

export const getOptions = (app: Application) => {
  return { app }
}
