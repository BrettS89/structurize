// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../../../declarations'
import { dataValidator, queryValidator } from '../../../../validators'
import type { SecurityUserV1Service } from './v1.class'
import { resource, fields } from '../../../../schema/resource'

// Main data model schema
export const securityUserV1Schema = Type.Object(
  {
    _id: ObjectIdSchema(),
    email: Type.String(),
    password: Type.String(),
    accountId: ObjectIdSchema(),
    roleId: ObjectIdSchema(),
    ...resource
  },
  { $id: 'SecurityUserV1', additionalProperties: false }
)
export type SecurityUserV1 = Static<typeof securityUserV1Schema>
export const securityUserV1Validator = getValidator(securityUserV1Schema, dataValidator)
export const securityUserV1Resolver = resolve<SecurityUserV1, HookContext<SecurityUserV1Service>>({})

export const securityUserV1ExternalResolver = resolve<SecurityUserV1, HookContext<SecurityUserV1Service>>({})

// Schema for creating new entries
export const securityUserV1DataSchema = Type.Pick(
  securityUserV1Schema,
  ['email', 'password', 'accountId', 'roleId', ...fields],
  {
    $id: 'SecurityUserV1Data'
  }
)
export type SecurityUserV1Data = Static<typeof securityUserV1DataSchema>
export const securityUserV1DataValidator = getValidator(securityUserV1DataSchema, dataValidator)
export const securityUserV1DataResolver = resolve<SecurityUserV1, HookContext<SecurityUserV1Service>>({})

// Schema for updating existing entries
export const securityUserV1PatchSchema = Type.Partial(securityUserV1Schema, {
  $id: 'SecurityUserV1Patch'
})
export type SecurityUserV1Patch = Static<typeof securityUserV1PatchSchema>
export const securityUserV1PatchValidator = getValidator(securityUserV1PatchSchema, dataValidator)
export const securityUserV1PatchResolver = resolve<SecurityUserV1, HookContext<SecurityUserV1Service>>({})

// Schema for allowed query properties
export const securityUserV1QueryProperties = Type.Pick(securityUserV1Schema, ['_id', 'email', 'accountId'])
export const securityUserV1QuerySchema = Type.Intersect(
  [
    querySyntax(securityUserV1QueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type SecurityUserV1Query = Static<typeof securityUserV1QuerySchema>
export const securityUserV1QueryValidator = getValidator(securityUserV1QuerySchema, queryValidator)
export const securityUserV1QueryResolver = resolve<SecurityUserV1Query, HookContext<SecurityUserV1Service>>(
  {}
)
