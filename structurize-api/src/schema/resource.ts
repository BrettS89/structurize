import { Type, ObjectIdSchema } from '@feathersjs/typebox'

export const resource = {
  createdById: Type.Optional(ObjectIdSchema()),
  updatedById: Type.Optional(ObjectIdSchema()),
  createdAt: Type.Optional(Type.String({ format: 'date-time' })),
  updatedAt: Type.Optional(Type.String({ format: 'date-time' }))
} as any

export const fields = ['createdById', 'updatedById', 'createdAt', 'updatedAt']
