import { HookContext } from '../declarations'
import { authenticate } from './authenticate'
import { authenticateApiKey } from './authenticate-api-key'

export const authenticateUserOrApiKey = async (context: HookContext): Promise<HookContext> => {
  try {
    const res = await authenticateApiKey(context)
    return res
  } catch {} 

  return authenticate()(context) as HookContext
}
