import { securityApiKeyV1 } from './security/api-key/v1/v1'
import { schemasV1 } from './schemas/v1/v1'
import { systemCommand } from './system/command/command'
import { securitySessionV1 } from './security/session/v1/v1'
import { schemaV1 } from './schema/v1/v1'
import { securityRoleV1 } from './security/role/v1/v1'
import { securityAccountV1 } from './security/account/v1/v1'
import { securityUserV1 } from './security/user/v1/v1'

// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(securityApiKeyV1)
  app.configure(schemasV1)
  app.configure(systemCommand)
  app.configure(securitySessionV1)
  app.configure(schemaV1)
  app.configure(securityRoleV1)
  app.configure(securityAccountV1)
  app.configure(securityUserV1)
  // All services will be registered here
}
