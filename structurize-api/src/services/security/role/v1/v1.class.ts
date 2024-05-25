// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../../../declarations'
import type {
  SecurityRoleV1,
  SecurityRoleV1Data,
  SecurityRoleV1Patch,
  SecurityRoleV1Query
} from './v1.schema'

export type { SecurityRoleV1, SecurityRoleV1Data, SecurityRoleV1Patch, SecurityRoleV1Query }

export interface SecurityRoleV1Params extends MongoDBAdapterParams<SecurityRoleV1Query> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class SecurityRoleV1Service<
  ServiceParams extends Params = SecurityRoleV1Params
> extends MongoDBService<SecurityRoleV1, SecurityRoleV1Data, SecurityRoleV1Params, SecurityRoleV1Patch> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('security-role-v-1'))
  }
}
