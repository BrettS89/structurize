// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import type { Application } from '../../../declarations'
import { authenticateApiKey } from '../../../hooks/authenticate-api-key'
import { SchemasV1Service, getOptions } from './v1.class'
import { schemasV1Path, schemasV1Methods } from './v1.shared'

export * from './v1.class'

// A configure function that registers the service and its hooks via `app.configure`
export const schemasV1 = (app: Application) => {
  // Register our service on the Feathers application
  app.use(schemasV1Path, new SchemasV1Service(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: schemasV1Methods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(schemasV1Path).hooks({
    around: {
      all: []
    },
    before: {
      all: [],
      create: [
        authenticateApiKey,
      ]
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
    [schemasV1Path]: SchemasV1Service
  }
}
