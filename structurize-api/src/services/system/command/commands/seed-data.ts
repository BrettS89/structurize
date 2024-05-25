import { Command } from './types'

export const seedData: Command = {
  name: 'seed-data',
  async fn(context) {
    const client = await context.app.get('mongodbClient')

    const collections = await client.collections()

    const promises = collections.map((coll) => coll.deleteMany({}))

    await Promise.all(promises)

    const devRolePromise = context.app.service('security/role/v1').create({
      name: 'developer'
    })

    const userRolePromise = context.app.service('security/role/v1').create({
      name: 'user'
    })

    const accountPromise = context.app.service('security/account/v1').create({
      name: 'structurize'
    })

    const [devRole, _, account] = await Promise.all([devRolePromise, userRolePromise, accountPromise])

    await context.app.service('security/user/v1').create({
      email: 'brett@structurize.io',
      password: 'secret',
      accountId: account._id,
      roleId: devRole._id
    })
    
  }
}
