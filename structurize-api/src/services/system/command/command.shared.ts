// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../../client'
import type {
  SystemCommand,
  SystemCommandData,
  SystemCommandPatch,
  SystemCommandQuery,
  SystemCommandService
} from './command.class'

export type { SystemCommand, SystemCommandData, SystemCommandPatch, SystemCommandQuery }

export type SystemCommandClientService = Pick<
  SystemCommandService<Params<SystemCommandQuery>>,
  (typeof systemCommandMethods)[number]
>

export const systemCommandPath = 'system/command'

export const systemCommandMethods: Array<keyof SystemCommandService> = [
  'find',
  'get',
  'create',
  'patch',
  'remove'
]

export const systemCommandClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(systemCommandPath, connection.service(systemCommandPath), {
    methods: systemCommandMethods
  })
}

// Add this service to the client service type index
declare module '../../../client' {
  interface ServiceTypes {
    [systemCommandPath]: SystemCommandClientService
  }
}
