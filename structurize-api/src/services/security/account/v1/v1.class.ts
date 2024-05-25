// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../../../declarations'
import type {
  SecurityAccountV1,
  SecurityAccountV1Data,
  SecurityAccountV1Patch,
  SecurityAccountV1Query
} from './v1.schema'

export type { SecurityAccountV1, SecurityAccountV1Data, SecurityAccountV1Patch, SecurityAccountV1Query }

export interface SecurityAccountV1Params extends MongoDBAdapterParams<SecurityAccountV1Query> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class SecurityAccountV1Service<
  ServiceParams extends Params = SecurityAccountV1Params
> extends MongoDBService<
  SecurityAccountV1,
  SecurityAccountV1Data,
  SecurityAccountV1Params,
  SecurityAccountV1Patch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('security-account-v-1'))
  }
}
