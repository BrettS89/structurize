// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../../declarations'
import type {
  SystemCommand,
  SystemCommandData,
  SystemCommandPatch,
  SystemCommandQuery
} from './command.schema'

export type { SystemCommand, SystemCommandData, SystemCommandPatch, SystemCommandQuery }

export interface SystemCommandParams extends MongoDBAdapterParams<SystemCommandQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class SystemCommandService<ServiceParams extends Params = SystemCommandParams> extends MongoDBService<
  SystemCommand,
  SystemCommandData,
  SystemCommandParams,
  SystemCommandPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('system-command'))
  }
}
