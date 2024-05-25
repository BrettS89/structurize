// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../../client'
import type { SchemaV1, SchemaV1Data, SchemaV1Patch, SchemaV1Query, SchemaV1Service } from './v1.class'

export type { SchemaV1, SchemaV1Data, SchemaV1Patch, SchemaV1Query }

export type SchemaV1ClientService = Pick<
  SchemaV1Service<Params<SchemaV1Query>>,
  (typeof schemaV1Methods)[number]
>

export const schemaV1Path = 'schema/v1'

export const schemaV1Methods: Array<keyof SchemaV1Service> = ['find', 'get', 'create', 'patch', 'remove']

export const schemaV1Client = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(schemaV1Path, connection.service(schemaV1Path), {
    methods: schemaV1Methods
  })
}

// Add this service to the client service type index
declare module '../../../client' {
  interface ServiceTypes {
    [schemaV1Path]: SchemaV1ClientService
  }
}
