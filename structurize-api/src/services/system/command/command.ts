// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  systemCommandDataValidator,
  systemCommandPatchValidator,
  systemCommandQueryValidator,
  systemCommandResolver,
  systemCommandExternalResolver,
  systemCommandDataResolver,
  systemCommandPatchResolver,
  systemCommandQueryResolver
} from './command.schema'

import type { Application } from '../../../declarations'
import { SystemCommandService, getOptions } from './command.class'
import { executeCommand } from './hooks'
import { track } from '../../../hooks/track-resource'

export const systemCommandPath = 'system/command'
export const systemCommandMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export * from './command.class'
export * from './command.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const systemCommand = (app: Application) => {
  // Register our service on the Feathers application
  app.use(systemCommandPath, new SystemCommandService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: systemCommandMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(systemCommandPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(systemCommandExternalResolver),
        schemaHooks.resolveResult(systemCommandResolver)
      ]
    },
    before: {
      all: [
        track,
        schemaHooks.validateQuery(systemCommandQueryValidator),
        schemaHooks.resolveQuery(systemCommandQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(systemCommandDataValidator),
        schemaHooks.resolveData(systemCommandDataResolver),
        executeCommand
      ],
      patch: [
        schemaHooks.validateData(systemCommandPatchValidator),
        schemaHooks.resolveData(systemCommandPatchResolver)
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
declare module '../../../declarations' {
  interface ServiceTypes {
    [systemCommandPath]: SystemCommandService
  }
}
