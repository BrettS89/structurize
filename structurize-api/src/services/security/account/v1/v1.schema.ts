// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../../../declarations'
import { dataValidator, queryValidator } from '../../../../validators'
import type { SecurityAccountV1Service } from './v1.class'
import { fields, resource } from '../../../../schema/resource'

// Main data model schema
export const securityAccountV1Schema = Type.Object(
  {
    _id: ObjectIdSchema(),
    name: Type.String(),
    ...resource
  },
  { $id: 'SecurityAccountV1', additionalProperties: false }
)
export type SecurityAccountV1 = Static<typeof securityAccountV1Schema>
export const securityAccountV1Validator = getValidator(securityAccountV1Schema, dataValidator)
export const securityAccountV1Resolver = resolve<SecurityAccountV1, HookContext<SecurityAccountV1Service>>({})

export const securityAccountV1ExternalResolver = resolve<
  SecurityAccountV1,
  HookContext<SecurityAccountV1Service>
>({})

// Schema for creating new entries
export const securityAccountV1DataSchema = Type.Pick(securityAccountV1Schema, ['name', ...fields], {
  $id: 'SecurityAccountV1Data'
})
export type SecurityAccountV1Data = Static<typeof securityAccountV1DataSchema>
export const securityAccountV1DataValidator = getValidator(securityAccountV1DataSchema, dataValidator)
export const securityAccountV1DataResolver = resolve<
  SecurityAccountV1,
  HookContext<SecurityAccountV1Service>
>({})

// Schema for updating existing entries
export const securityAccountV1PatchSchema = Type.Partial(securityAccountV1Schema, {
  $id: 'SecurityAccountV1Patch'
})
export type SecurityAccountV1Patch = Static<typeof securityAccountV1PatchSchema>
export const securityAccountV1PatchValidator = getValidator(securityAccountV1PatchSchema, dataValidator)
export const securityAccountV1PatchResolver = resolve<
  SecurityAccountV1,
  HookContext<SecurityAccountV1Service>
>({})

// Schema for allowed query properties
export const securityAccountV1QueryProperties = Type.Pick(securityAccountV1Schema, ['_id', 'name'])
export const securityAccountV1QuerySchema = Type.Intersect(
  [
    querySyntax(securityAccountV1QueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type SecurityAccountV1Query = Static<typeof securityAccountV1QuerySchema>
export const securityAccountV1QueryValidator = getValidator(securityAccountV1QuerySchema, queryValidator)
export const securityAccountV1QueryResolver = resolve<
  SecurityAccountV1Query,
  HookContext<SecurityAccountV1Service>
>({})
