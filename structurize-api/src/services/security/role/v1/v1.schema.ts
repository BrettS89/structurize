// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../../../declarations'
import { dataValidator, queryValidator } from '../../../../validators'
import type { SecurityRoleV1Service } from './v1.class'
import { fields, resource } from '../../../../schema/resource'

// Main data model schema
export const securityRoleV1Schema = Type.Object(
  {
    _id: ObjectIdSchema(),
    name: Type.String(),
    ...resource
  },
  { $id: 'SecurityRoleV1', additionalProperties: false }
)
export type SecurityRoleV1 = Static<typeof securityRoleV1Schema>
export const securityRoleV1Validator = getValidator(securityRoleV1Schema, dataValidator)
export const securityRoleV1Resolver = resolve<SecurityRoleV1, HookContext<SecurityRoleV1Service>>({})

export const securityRoleV1ExternalResolver = resolve<SecurityRoleV1, HookContext<SecurityRoleV1Service>>({})

// Schema for creating new entries
export const securityRoleV1DataSchema = Type.Pick(securityRoleV1Schema, ['name', ...fields], {
  $id: 'SecurityRoleV1Data'
})
export type SecurityRoleV1Data = Static<typeof securityRoleV1DataSchema>
export const securityRoleV1DataValidator = getValidator(securityRoleV1DataSchema, dataValidator)
export const securityRoleV1DataResolver = resolve<SecurityRoleV1, HookContext<SecurityRoleV1Service>>({})

// Schema for updating existing entries
export const securityRoleV1PatchSchema = Type.Partial(securityRoleV1Schema, {
  $id: 'SecurityRoleV1Patch'
})
export type SecurityRoleV1Patch = Static<typeof securityRoleV1PatchSchema>
export const securityRoleV1PatchValidator = getValidator(securityRoleV1PatchSchema, dataValidator)
export const securityRoleV1PatchResolver = resolve<SecurityRoleV1, HookContext<SecurityRoleV1Service>>({})

// Schema for allowed query properties
export const securityRoleV1QueryProperties = Type.Pick(securityRoleV1Schema, ['_id', 'name'])
export const securityRoleV1QuerySchema = Type.Intersect(
  [
    querySyntax(securityRoleV1QueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type SecurityRoleV1Query = Static<typeof securityRoleV1QuerySchema>
export const securityRoleV1QueryValidator = getValidator(securityRoleV1QuerySchema, queryValidator)
export const securityRoleV1QueryResolver = resolve<SecurityRoleV1Query, HookContext<SecurityRoleV1Service>>(
  {}
)
