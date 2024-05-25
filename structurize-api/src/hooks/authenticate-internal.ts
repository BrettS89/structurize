import { Forbidden } from '@feathersjs/errors';
import { HookContext } from '../declarations';

export const authenticateInternal = async (context: HookContext): Promise<HookContext> => {
  const { params } = context

  if (!params.provider || params.user?.roleName === 'developer') {
    return context
  }

  throw new Forbidden()
}
