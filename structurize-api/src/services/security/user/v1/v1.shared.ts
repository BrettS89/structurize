// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../../../client'
import type {
  SecurityUserV1,
  SecurityUserV1Data,
  SecurityUserV1Patch,
  SecurityUserV1Query,
  SecurityUserV1Service
} from './v1.class'

export type { SecurityUserV1, SecurityUserV1Data, SecurityUserV1Patch, SecurityUserV1Query }

export type SecurityUserV1ClientService = Pick<
  SecurityUserV1Service<Params<SecurityUserV1Query>>,
  (typeof securityUserV1Methods)[number]
>

export const securityUserV1Path = 'security/user/v1'

export const securityUserV1Methods: Array<keyof SecurityUserV1Service> = [
  'find',
  'get',
  'create',
  'patch',
  'remove'
]

export const securityUserV1Client = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(securityUserV1Path, connection.service(securityUserV1Path), {
    methods: securityUserV1Methods
  })
}

// Add this service to the client service type index
declare module '../../../../client' {
  interface ServiceTypes {
    [securityUserV1Path]: SecurityUserV1ClientService
  }
}
