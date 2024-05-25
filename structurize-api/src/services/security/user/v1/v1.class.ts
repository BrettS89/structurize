// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../../../declarations'
import type {
  SecurityUserV1,
  SecurityUserV1Data,
  SecurityUserV1Patch,
  SecurityUserV1Query
} from './v1.schema'

export type { SecurityUserV1, SecurityUserV1Data, SecurityUserV1Patch, SecurityUserV1Query }

export interface SecurityUserV1Params extends MongoDBAdapterParams<SecurityUserV1Query> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class SecurityUserV1Service<
  ServiceParams extends Params = SecurityUserV1Params
> extends MongoDBService<SecurityUserV1, SecurityUserV1Data, SecurityUserV1Params, SecurityUserV1Patch> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('security-user-v-1'))
  }
}
