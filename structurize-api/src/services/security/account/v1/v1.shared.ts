// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../../../client'
import type {
  SecurityAccountV1,
  SecurityAccountV1Data,
  SecurityAccountV1Patch,
  SecurityAccountV1Query,
  SecurityAccountV1Service
} from './v1.class'

export type { SecurityAccountV1, SecurityAccountV1Data, SecurityAccountV1Patch, SecurityAccountV1Query }

export type SecurityAccountV1ClientService = Pick<
  SecurityAccountV1Service<Params<SecurityAccountV1Query>>,
  (typeof securityAccountV1Methods)[number]
>

export const securityAccountV1Path = 'security/account/v1'

export const securityAccountV1Methods: Array<keyof SecurityAccountV1Service> = [
  'find',
  'get',
  'create',
  'patch',
  'remove'
]

export const securityAccountV1Client = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(securityAccountV1Path, connection.service(securityAccountV1Path), {
    methods: securityAccountV1Methods
  })
}

// Add this service to the client service type index
declare module '../../../../client' {
  interface ServiceTypes {
    [securityAccountV1Path]: SecurityAccountV1ClientService
  }
}
