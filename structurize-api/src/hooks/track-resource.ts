import { HookContext } from '@feathersjs/feathers'

export const track = (context: HookContext) => {
  const date = new Date().toISOString()

  if (context.method === 'create') {
    context.data.createdById = context.params?.user?._id ?? undefined
    context.data.updatedById = context.params?.user?._id ?? undefined
    context.data.createdAt = date
    context.data.updatedAt = date
  } else if (context.method === 'patch') {
    context.data.updatedById = context.params?.user?._id ?? undefined
    context.data.updatedAt = date
  } else if (context.method === 'update') {
    context.data.updatedById = context.params?.user?._id ?? undefined
    context.data.updatedAt = date
  }

  return context
}
