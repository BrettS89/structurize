// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../../declarations'
import type { SchemaV1, SchemaV1Data, SchemaV1Patch, SchemaV1Query } from './v1.schema'

export type { SchemaV1, SchemaV1Data, SchemaV1Patch, SchemaV1Query }

export interface SchemaV1Params extends MongoDBAdapterParams<SchemaV1Query> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class SchemaV1Service<ServiceParams extends Params = SchemaV1Params> extends MongoDBService<
  SchemaV1,
  SchemaV1Data,
  SchemaV1Params,
  SchemaV1Patch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('schema/v1'))
  }
}
