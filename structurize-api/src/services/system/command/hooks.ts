import { NotFound } from '@feathersjs/errors'
import { HookContext } from '../../../declarations'
import { commands } from './commands'

export const executeCommand = async (context: HookContext): Promise<HookContext> => {
  const command = commands.find((c) => c.name === context.data.name)

  if (!command) {
    throw new NotFound('No command found with this name')
  }

  await command.fn(context)

  return context
}
