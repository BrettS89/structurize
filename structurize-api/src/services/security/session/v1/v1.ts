// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import { securitySessionV1Resolver, securitySessionV1ExternalResolver } from './v1.schema'

import type { Application } from '../../../../declarations'
import { SecuritySessionV1Service, getOptions } from './v1.class'
import { securitySessionV1Path, securitySessionV1Methods } from './v1.shared'
import { authenticate } from '../../../../hooks/authenticate'

export * from './v1.class'
export * from './v1.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const securitySessionV1 = (app: Application) => {
  // Register our service on the Feathers application
  app.use(securitySessionV1Path, new SecuritySessionV1Service(app), {
    // A list of all methods this service exposes externally
    methods: securitySessionV1Methods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(securitySessionV1Path).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(securitySessionV1ExternalResolver),
        schemaHooks.resolveResult(securitySessionV1Resolver)
      ]
    },
    before: {
      all: [],
      find: [authenticate()],
      create: []
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
    [securitySessionV1Path]: SecuritySessionV1Service
  }
}
