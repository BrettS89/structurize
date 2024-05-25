// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  securityUserV1DataValidator,
  securityUserV1PatchValidator,
  securityUserV1QueryValidator,
  securityUserV1Resolver,
  securityUserV1ExternalResolver,
  securityUserV1DataResolver,
  securityUserV1PatchResolver,
  securityUserV1QueryResolver
} from './v1.schema'

import type { Application } from '../../../../declarations'
import { SecurityUserV1Service, getOptions } from './v1.class'
import { securityUserV1Path, securityUserV1Methods } from './v1.shared'
import { hashPassword } from './v1.hooks'
import { track } from '../../../../hooks/track-resource'
import { authenticate } from '../../../../hooks/authenticate'

export * from './v1.class'
export * from './v1.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const securityUserV1 = (app: Application) => {
  // Register our service on the Feathers application
  app.use(securityUserV1Path, new SecurityUserV1Service(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: securityUserV1Methods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(securityUserV1Path).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(securityUserV1ExternalResolver),
        schemaHooks.resolveResult(securityUserV1Resolver)
      ]
    },
    before: {
      all: [
        authenticate(),
        track,
        schemaHooks.validateQuery(securityUserV1QueryValidator),
        schemaHooks.resolveQuery(securityUserV1QueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(securityUserV1DataValidator),
        schemaHooks.resolveData(securityUserV1DataResolver),
        hashPassword
      ],
      patch: [
        schemaHooks.validateData(securityUserV1PatchValidator),
        schemaHooks.resolveData(securityUserV1PatchResolver)
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
    [securityUserV1Path]: SecurityUserV1Service
  }
}
