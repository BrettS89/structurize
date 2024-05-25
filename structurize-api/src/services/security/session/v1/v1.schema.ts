// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../../../declarations'
import { dataValidator, queryValidator } from '../../../../validators'
import type { SecuritySessionV1Service } from './v1.class'

// Main data model schema
export const securitySessionV1Schema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'SecuritySessionV1', additionalProperties: false }
)
export type SecuritySessionV1 = Static<typeof securitySessionV1Schema>
export const securitySessionV1Validator = getValidator(securitySessionV1Schema, dataValidator)
export const securitySessionV1Resolver = resolve<SecuritySessionV1, HookContext<SecuritySessionV1Service>>({})

export const securitySessionV1ExternalResolver = resolve<
  SecuritySessionV1,
  HookContext<SecuritySessionV1Service>
>({})

// Schema for creating new entries
export const securitySessionV1DataSchema = Type.Pick(securitySessionV1Schema, ['text'], {
  $id: 'SecuritySessionV1Data'
})
export type SecuritySessionV1Data = Static<typeof securitySessionV1DataSchema>
export const securitySessionV1DataValidator = getValidator(securitySessionV1DataSchema, dataValidator)
export const securitySessionV1DataResolver = resolve<
  SecuritySessionV1,
  HookContext<SecuritySessionV1Service>
>({})

// Schema for updating existing entries
export const securitySessionV1PatchSchema = Type.Partial(securitySessionV1Schema, {
  $id: 'SecuritySessionV1Patch'
})
export type SecuritySessionV1Patch = Static<typeof securitySessionV1PatchSchema>
export const securitySessionV1PatchValidator = getValidator(securitySessionV1PatchSchema, dataValidator)
export const securitySessionV1PatchResolver = resolve<
  SecuritySessionV1,
  HookContext<SecuritySessionV1Service>
>({})

// Schema for allowed query properties
export const securitySessionV1QueryProperties = Type.Pick(securitySessionV1Schema, ['id', 'text'])
export const securitySessionV1QuerySchema = Type.Intersect(
  [
    querySyntax(securitySessionV1QueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type SecuritySessionV1Query = Static<typeof securitySessionV1QuerySchema>
export const securitySessionV1QueryValidator = getValidator(securitySessionV1QuerySchema, queryValidator)
export const securitySessionV1QueryResolver = resolve<
  SecuritySessionV1Query,
  HookContext<SecuritySessionV1Service>
>({})
