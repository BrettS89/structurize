// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../../declarations'
import { dataValidator, queryValidator } from '../../../validators'
import type { SchemaV1Service } from './v1.class'
import { resource, fields } from '../../../schema/resource'

// Main data model schema
export const schemaV1Schema = Type.Object(
  {
    _id: ObjectIdSchema(),
    name: Type.String(),
    accountId: ObjectIdSchema(),
    appName: Type.String(),
    json: Type.String(),
    ...resource
  },
  { $id: 'SchemaV1', additionalProperties: false }
)
export type SchemaV1 = Static<typeof schemaV1Schema>
export const schemaV1Validator = getValidator(schemaV1Schema, dataValidator)
export const schemaV1Resolver = resolve<SchemaV1, HookContext<SchemaV1Service>>({})

export const schemaV1ExternalResolver = resolve<SchemaV1, HookContext<SchemaV1Service>>({})

// Schema for creating new entries
export const schemaV1DataSchema = Type.Pick(
  schemaV1Schema,
  ['name', 'accountId', 'json', 'appName', ...fields],
  {
    $id: 'SchemaV1Data'
  }
)
export type SchemaV1Data = Static<typeof schemaV1DataSchema>
export const schemaV1DataValidator = getValidator(schemaV1DataSchema, dataValidator)
export const schemaV1DataResolver = resolve<SchemaV1, HookContext<SchemaV1Service>>({})

// Schema for updating existing entries
export const schemaV1PatchSchema = Type.Partial(schemaV1Schema, {
  $id: 'SchemaV1Patch'
})
export type SchemaV1Patch = Static<typeof schemaV1PatchSchema>
export const schemaV1PatchValidator = getValidator(schemaV1PatchSchema, dataValidator)
export const schemaV1PatchResolver = resolve<SchemaV1, HookContext<SchemaV1Service>>({})

// Schema for allowed query properties
export const schemaV1QueryProperties = Type.Pick(schemaV1Schema, ['_id', 'accountId', 'appName'])
export const schemaV1QuerySchema = Type.Intersect(
  [
    querySyntax(schemaV1QueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type SchemaV1Query = Static<typeof schemaV1QuerySchema>
export const schemaV1QueryValidator = getValidator(schemaV1QuerySchema, queryValidator)
export const schemaV1QueryResolver = resolve<SchemaV1Query, HookContext<SchemaV1Service>>({})
