// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../../../client'
import type {
  SecurityRoleV1,
  SecurityRoleV1Data,
  SecurityRoleV1Patch,
  SecurityRoleV1Query,
  SecurityRoleV1Service
} from './v1.class'

export type { SecurityRoleV1, SecurityRoleV1Data, SecurityRoleV1Patch, SecurityRoleV1Query }

export type SecurityRoleV1ClientService = Pick<
  SecurityRoleV1Service<Params<SecurityRoleV1Query>>,
  (typeof securityRoleV1Methods)[number]
>

export const securityRoleV1Path = 'security/role/v1'

export const securityRoleV1Methods: Array<keyof SecurityRoleV1Service> = [
  'find',
  'get',
  'create',
  'patch',
  'remove'
]

export const securityRoleV1Client = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(securityRoleV1Path, connection.service(securityRoleV1Path), {
    methods: securityRoleV1Methods
  })
}

// Add this service to the client service type index
declare module '../../../../client' {
  interface ServiceTypes {
    [securityRoleV1Path]: SecurityRoleV1ClientService
  }
}
