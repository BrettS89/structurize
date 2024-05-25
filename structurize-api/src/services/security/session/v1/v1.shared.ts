// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type {
  SecuritySessionV1,
  SecuritySessionV1Data,
  SecuritySessionV1Patch,
  SecuritySessionV1Query,
  SecuritySessionV1Service
} from './v1.class'

export type { SecuritySessionV1, SecuritySessionV1Data, SecuritySessionV1Patch, SecuritySessionV1Query }

export const securitySessionV1Path = 'security/session/v1'

export const securitySessionV1Methods: Array<keyof SecuritySessionV1Service> = ['find', 'create']
