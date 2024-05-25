import { HookContext } from '../../../../declarations'

export interface Command {
  name: string
  fn: (context: HookContext) => void | Promise<void>
}
