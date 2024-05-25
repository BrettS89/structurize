// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../../../declarations'
import type {
  SecurityApiKeyV1,
  SecurityApiKeyV1Data,
  SecurityApiKeyV1Patch,
  SecurityApiKeyV1Query
} from './v1.schema'

export type { SecurityApiKeyV1, SecurityApiKeyV1Data, SecurityApiKeyV1Patch, SecurityApiKeyV1Query }

export interface SecurityApiKeyV1Params extends MongoDBAdapterParams<SecurityApiKeyV1Query> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class SecurityApiKeyV1Service<
  ServiceParams extends Params = SecurityApiKeyV1Params
> extends MongoDBService<
  SecurityApiKeyV1,
  SecurityApiKeyV1Data,
  SecurityApiKeyV1Params,
  SecurityApiKeyV1Patch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('security-api-key-v-1'))
  }
}
