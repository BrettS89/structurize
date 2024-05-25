// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  securityApiKeyV1DataValidator,
  securityApiKeyV1PatchValidator,
  securityApiKeyV1QueryValidator,
  securityApiKeyV1Resolver,
  securityApiKeyV1ExternalResolver,
  securityApiKeyV1DataResolver,
  securityApiKeyV1PatchResolver,
  securityApiKeyV1QueryResolver
} from './v1.schema'

import type { Application } from '../../../../declarations'
import { SecurityApiKeyV1Service, getOptions } from './v1.class'
import { securityApiKeyV1Path, securityApiKeyV1Methods } from './v1.shared'
import { authenticate } from '../../../../hooks/authenticate'
import { generateApiKey, setPlainApiKey } from './v1.hooks'
import { track } from '../../../../hooks/track-resource'

export * from './v1.class'
export * from './v1.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const securityApiKeyV1 = (app: Application) => {
  // Register our service on the Feathers application
  app.use(securityApiKeyV1Path, new SecurityApiKeyV1Service(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: securityApiKeyV1Methods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(securityApiKeyV1Path).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(securityApiKeyV1ExternalResolver),
        schemaHooks.resolveResult(securityApiKeyV1Resolver)
      ]
    },
    before: {
      all: [
        authenticate(),
        track,
        schemaHooks.validateQuery(securityApiKeyV1QueryValidator),
        schemaHooks.resolveQuery(securityApiKeyV1QueryResolver)
      ],
      find: [],
      get: [],
      create: [
        authenticate(),
        generateApiKey,
        schemaHooks.validateData(securityApiKeyV1DataValidator),
        schemaHooks.resolveData(securityApiKeyV1DataResolver),
      ],
      patch: [
        schemaHooks.validateData(securityApiKeyV1PatchValidator),
        schemaHooks.resolveData(securityApiKeyV1PatchResolver)
      ],
      remove: []
    },
    after: {
      all: [],
      create: [setPlainApiKey]
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../../../declarations' {
  interface ServiceTypes {
    [securityApiKeyV1Path]: SecurityApiKeyV1Service
  }
}
