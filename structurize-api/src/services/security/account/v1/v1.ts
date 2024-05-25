// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  securityAccountV1DataValidator,
  securityAccountV1PatchValidator,
  securityAccountV1QueryValidator,
  securityAccountV1Resolver,
  securityAccountV1ExternalResolver,
  securityAccountV1DataResolver,
  securityAccountV1PatchResolver,
  securityAccountV1QueryResolver
} from './v1.schema'

import type { Application } from '../../../../declarations'
import { SecurityAccountV1Service, getOptions } from './v1.class'
import { securityAccountV1Path, securityAccountV1Methods } from './v1.shared'
import { track } from '../../../../hooks/track-resource'
import { authenticate } from '../../../../hooks/authenticate'

export * from './v1.class'
export * from './v1.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const securityAccountV1 = (app: Application) => {
  // Register our service on the Feathers application
  app.use(securityAccountV1Path, new SecurityAccountV1Service(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: securityAccountV1Methods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(securityAccountV1Path).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(securityAccountV1ExternalResolver),
        schemaHooks.resolveResult(securityAccountV1Resolver)
      ]
    },
    before: {
      all: [
        authenticate(),
        track,
        schemaHooks.validateQuery(securityAccountV1QueryValidator),
        schemaHooks.resolveQuery(securityAccountV1QueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(securityAccountV1DataValidator),
        schemaHooks.resolveData(securityAccountV1DataResolver)
      ],
      patch: [
        schemaHooks.validateData(securityAccountV1PatchValidator),
        schemaHooks.resolveData(securityAccountV1PatchResolver)
      ],
      remove: []
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
declare module '../../../../declarations' {
  interface ServiceTypes {
    [securityAccountV1Path]: SecurityAccountV1Service
  }
}
