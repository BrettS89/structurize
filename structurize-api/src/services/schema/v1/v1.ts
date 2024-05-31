// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  schemaV1DataValidator,
  schemaV1PatchValidator,
  schemaV1QueryValidator,
  schemaV1Resolver,
  schemaV1ExternalResolver,
  schemaV1DataResolver,
  schemaV1PatchResolver,
  schemaV1QueryResolver
} from './v1.schema'

import type { Application } from '../../../declarations'
import { SchemaV1Service, getOptions } from './v1.class'
import { schemaV1Path, schemaV1Methods } from './v1.shared'
import { authenticate } from '../../../hooks/authenticate'
import { track } from '../../../hooks/track-resource'
import { authenticateInternal } from '../../../hooks/authenticate-internal'
import { authenticateUserOrApiKey } from '../../../hooks/authenticate-user-or-key'
import { addAccountId } from './hooks'

export * from './v1.class'
export * from './v1.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const schemaV1 = (app: Application) => {
  // Register our service on the Feathers application
  app.use(schemaV1Path, new SchemaV1Service(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: schemaV1Methods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(schemaV1Path).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(schemaV1ExternalResolver),
        schemaHooks.resolveResult(schemaV1Resolver)
      ]
    },
    before: {
      all: [
        track,
        schemaHooks.validateQuery(schemaV1QueryValidator),
        schemaHooks.resolveQuery(schemaV1QueryResolver)
      ],
      find: [authenticateUserOrApiKey, addAccountId],
      get: [authenticate()],
      create: [
        authenticateInternal,
        schemaHooks.validateData(schemaV1DataValidator),
        schemaHooks.resolveData(schemaV1DataResolver)
      ],
      patch: [
        authenticateInternal,
        schemaHooks.validateData(schemaV1PatchValidator),
        schemaHooks.resolveData(schemaV1PatchResolver)
      ],
      remove: [authenticateInternal]
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    [schemaV1Path]: SchemaV1Service
  }
}
