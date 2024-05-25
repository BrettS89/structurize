// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../../declarations'
import { dataValidator, queryValidator } from '../../../validators'
import type { SystemCommandService } from './command.class'
import { fields, resource } from '../../../schema/resource'

// Main data model schema
export const systemCommandSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    name: Type.String(),
    ...resource
  },
  { $id: 'SystemCommand', additionalProperties: false }
)
export type SystemCommand = Static<typeof systemCommandSchema>
export const systemCommandValidator = getValidator(systemCommandSchema, dataValidator)
export const systemCommandResolver = resolve<SystemCommand, HookContext<SystemCommandService>>({})

export const systemCommandExternalResolver = resolve<SystemCommand, HookContext<SystemCommandService>>({})

// Schema for creating new entries
export const systemCommandDataSchema = Type.Pick(systemCommandSchema, ['name', ...fields], {
  $id: 'SystemCommandData'
})
export type SystemCommandData = Static<typeof systemCommandDataSchema>
export const systemCommandDataValidator = getValidator(systemCommandDataSchema, dataValidator)
export const systemCommandDataResolver = resolve<SystemCommand, HookContext<SystemCommandService>>({})

// Schema for updating existing entries
export const systemCommandPatchSchema = Type.Partial(systemCommandSchema, {
  $id: 'SystemCommandPatch'
})
export type SystemCommandPatch = Static<typeof systemCommandPatchSchema>
export const systemCommandPatchValidator = getValidator(systemCommandPatchSchema, dataValidator)
export const systemCommandPatchResolver = resolve<SystemCommand, HookContext<SystemCommandService>>({})

// Schema for allowed query properties
export const systemCommandQueryProperties = Type.Pick(systemCommandSchema, ['_id'])
export const systemCommandQuerySchema = Type.Intersect(
  [
    querySyntax(systemCommandQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type SystemCommandQuery = Static<typeof systemCommandQuerySchema>
export const systemCommandQueryValidator = getValidator(systemCommandQuerySchema, queryValidator)
export const systemCommandQueryResolver = resolve<SystemCommandQuery, HookContext<SystemCommandService>>({})
