// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../../../declarations'
import { dataValidator, queryValidator } from '../../../../validators'
import type { SecurityApiKeyV1Service } from './v1.class'
import { fields, resource } from '../../../../schema/resource'

// Main data model schema
export const securityApiKeyV1Schema = Type.Object(
  {
    _id: ObjectIdSchema(),
    accountId: ObjectIdSchema(),
    key: Type.String(),
    ...resource
  },
  { $id: 'SecurityApiKeyV1', additionalProperties: false }
)
export type SecurityApiKeyV1 = Static<typeof securityApiKeyV1Schema>
export const securityApiKeyV1Validator = getValidator(securityApiKeyV1Schema, dataValidator)
export const securityApiKeyV1Resolver = resolve<SecurityApiKeyV1, HookContext<SecurityApiKeyV1Service>>({})

export const securityApiKeyV1ExternalResolver = resolve<
  SecurityApiKeyV1,
  HookContext<SecurityApiKeyV1Service>
>({})

// Schema for creating new entries
export const securityApiKeyV1DataSchema = Type.Pick(securityApiKeyV1Schema, ['accountId', 'key', ...fields], {
  $id: 'SecurityApiKeyV1Data'
})
export type SecurityApiKeyV1Data = Static<typeof securityApiKeyV1DataSchema>
export const securityApiKeyV1DataValidator = getValidator(securityApiKeyV1DataSchema, dataValidator)
export const securityApiKeyV1DataResolver = resolve<SecurityApiKeyV1, HookContext<SecurityApiKeyV1Service>>(
  {}
)

// Schema for updating existing entries
export const securityApiKeyV1PatchSchema = Type.Partial(securityApiKeyV1Schema, {
  $id: 'SecurityApiKeyV1Patch'
})
export type SecurityApiKeyV1Patch = Static<typeof securityApiKeyV1PatchSchema>
export const securityApiKeyV1PatchValidator = getValidator(securityApiKeyV1PatchSchema, dataValidator)
export const securityApiKeyV1PatchResolver = resolve<SecurityApiKeyV1, HookContext<SecurityApiKeyV1Service>>(
  {}
)

// Schema for allowed query properties
export const securityApiKeyV1QueryProperties = Type.Pick(securityApiKeyV1Schema, ['_id', 'accountId'])
export const securityApiKeyV1QuerySchema = Type.Intersect(
  [
    querySyntax(securityApiKeyV1QueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type SecurityApiKeyV1Query = Static<typeof securityApiKeyV1QuerySchema>
export const securityApiKeyV1QueryValidator = getValidator(securityApiKeyV1QuerySchema, queryValidator)
export const securityApiKeyV1QueryResolver = resolve<
  SecurityApiKeyV1Query,
  HookContext<SecurityApiKeyV1Service>
>({})
