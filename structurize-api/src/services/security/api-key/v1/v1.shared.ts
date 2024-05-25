// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../../../client'
import type {
  SecurityApiKeyV1,
  SecurityApiKeyV1Data,
  SecurityApiKeyV1Patch,
  SecurityApiKeyV1Query,
  SecurityApiKeyV1Service
} from './v1.class'

export type { SecurityApiKeyV1, SecurityApiKeyV1Data, SecurityApiKeyV1Patch, SecurityApiKeyV1Query }

export type SecurityApiKeyV1ClientService = Pick<
  SecurityApiKeyV1Service<Params<SecurityApiKeyV1Query>>,
  (typeof securityApiKeyV1Methods)[number]
>

export const securityApiKeyV1Path = 'security/api-key/v1'

export const securityApiKeyV1Methods: Array<keyof SecurityApiKeyV1Service> = [
  'find',
  'get',
  'create',
  'patch',
  'remove'
]

export const securityApiKeyV1Client = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(securityApiKeyV1Path, connection.service(securityApiKeyV1Path), {
    methods: securityApiKeyV1Methods
  })
}

// Add this service to the client service type index
declare module '../../../../client' {
  interface ServiceTypes {
    [securityApiKeyV1Path]: SecurityApiKeyV1ClientService
  }
}
