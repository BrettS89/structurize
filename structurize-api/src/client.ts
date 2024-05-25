// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers'
import type { TransportConnection, Application } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'
import type { AuthenticationClientOptions } from '@feathersjs/authentication-client'

import { securityApiKeyV1Client } from './services/security/api-key/v1/v1.shared'
export type {
  SecurityApiKeyV1,
  SecurityApiKeyV1Data,
  SecurityApiKeyV1Query,
  SecurityApiKeyV1Patch
} from './services/security/api-key/v1/v1.shared'

import { schemasV1Client } from './services/schemas/v1/v1.shared'
export type {
  SchemasV1,
  SchemasV1Data,
  SchemasV1Query,
  SchemasV1Patch
} from './services/schemas/v1/v1.shared'

import { systemCommandClient } from './services/system/command/command.shared'
export type {
  SystemCommand,
  SystemCommandData,
  SystemCommandQuery,
  SystemCommandPatch
} from './services/system/command/command.shared'

import { schemaV1Client } from './services/schema/v1/v1.shared'
export type { SchemaV1, SchemaV1Data, SchemaV1Query, SchemaV1Patch } from './services/schema/v1/v1.shared'

import { securityRoleV1Client } from './services/security/role/v1/v1.shared'
export type {
  SecurityRoleV1,
  SecurityRoleV1Data,
  SecurityRoleV1Query,
  SecurityRoleV1Patch
} from './services/security/role/v1/v1.shared'

import { securityAccountV1Client } from './services/security/account/v1/v1.shared'
export type {
  SecurityAccountV1,
  SecurityAccountV1Data,
  SecurityAccountV1Query,
  SecurityAccountV1Patch
} from './services/security/account/v1/v1.shared'

import { securityUserV1Client } from './services/security/user/v1/v1.shared'
export type {
  SecurityUserV1,
  SecurityUserV1Data,
  SecurityUserV1Query,
  SecurityUserV1Patch
} from './services/security/user/v1/v1.shared'

export interface Configuration {
  connection: TransportConnection<ServiceTypes>
}

export interface ServiceTypes {}

export type ClientApplication = Application<ServiceTypes, Configuration>

/**
 * Returns a typed client for the structurize-api app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export const createClient = <Configuration = any,>(
  connection: TransportConnection<ServiceTypes>,
  authenticationOptions: Partial<AuthenticationClientOptions> = {}
) => {
  const client: ClientApplication = feathers()

  client.configure(connection)
  client.configure(authenticationClient(authenticationOptions))
  client.set('connection', connection)

  client.configure(securityUserV1Client)
  client.configure(securityAccountV1Client)
  client.configure(securityRoleV1Client)
  client.configure(schemaV1Client)
  client.configure(systemCommandClient)
  client.configure(schemasV1Client)
  client.configure(securityApiKeyV1Client)
  return client
}
