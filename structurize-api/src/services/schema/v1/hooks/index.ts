import Ajv from 'ajv'
import { HookContext } from '../../../../declarations'
import { SchemaV1Service } from '../v1.class'
import { BadRequest } from '@feathersjs/errors'

export const validateSchema = (context: HookContext<SchemaV1Service>): HookContext => {
  const { data } = context

  const ajv = new Ajv({
    allErrors: true
  })

  const parsed = JSON.parse(data.json)

  if (!parsed.title) {
    throw new BadRequest('schema must include the title field')
  }

  try {
    ajv.compile(parsed)
  } catch (e) {
    console.log(e)
    throw new BadRequest(`invalid json schema format for schema: ${parsed.title}`)
  }

  data.name = parsed.title

  return context
}
