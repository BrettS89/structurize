// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../../client'
import type { SchemasV1, SchemasV1Data, SchemasV1Patch, SchemasV1Query, SchemasV1Service } from './v1.class'

export type { SchemasV1, SchemasV1Data, SchemasV1Patch, SchemasV1Query }

export type SchemasV1ClientService = Pick<
  SchemasV1Service<Params<SchemasV1Query>>,
  (typeof schemasV1Methods)[number]
>

export const schemasV1Path = 'schemas/v1'

export const schemasV1Methods: Array<keyof SchemasV1Service> = ['create']

export const schemasV1Client = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(schemasV1Path, connection.service(schemasV1Path), {
    methods: schemasV1Methods
  })
}

// Add this service to the client service type index
declare module '../../../client' {
  interface ServiceTypes {
    [schemasV1Path]: SchemasV1ClientService
  }
}
