// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  securityRoleV1DataValidator,
  securityRoleV1PatchValidator,
  securityRoleV1QueryValidator,
  securityRoleV1Resolver,
  securityRoleV1ExternalResolver,
  securityRoleV1DataResolver,
  securityRoleV1PatchResolver,
  securityRoleV1QueryResolver
} from './v1.schema'

import type { Application } from '../../../../declarations'
import { SecurityRoleV1Service, getOptions } from './v1.class'
import { securityRoleV1Path, securityRoleV1Methods } from './v1.shared'
import { authenticate } from '../../../../hooks/authenticate'
import { track } from '../../../../hooks/track-resource'

export * from './v1.class'
export * from './v1.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const securityRoleV1 = (app: Application) => {
  // Register our service on the Feathers application
  app.use(securityRoleV1Path, new SecurityRoleV1Service(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: securityRoleV1Methods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(securityRoleV1Path).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(securityRoleV1ExternalResolver),
        schemaHooks.resolveResult(securityRoleV1Resolver)
      ]
    },
    before: {
      all: [
        authenticate(),
        track,
        schemaHooks.validateQuery(securityRoleV1QueryValidator),
        schemaHooks.resolveQuery(securityRoleV1QueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(securityRoleV1DataValidator),
        schemaHooks.resolveData(securityRoleV1DataResolver)
      ],
      patch: [
        schemaHooks.validateData(securityRoleV1PatchValidator),
        schemaHooks.resolveData(securityRoleV1PatchResolver)
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
    [securityRoleV1Path]: SecurityRoleV1Service
  }
}
