// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#custom-services
import type { Params, ServiceInterface } from '@feathersjs/feathers'
import { BadRequest } from '@feathersjs/errors'
import Ajv from 'ajv'
import _ from 'underscore'

import type { Application } from '../../../declarations'

type SchemasV1 = any
type SchemasV1Data = {
  appName: string
  accountId: string
  jsonArray: any[]
}
type SchemasV1Patch = any
type SchemasV1Query = any

export type { SchemasV1, SchemasV1Data, SchemasV1Patch, SchemasV1Query }

export interface SchemasV1ServiceOptions {
  app: Application
}

export interface SchemasV1Params extends Params<SchemasV1Query> {}

interface FormattedSchema {
  appName: string
  accountId: string
  json: string
  name: string
}

export const formatSchemaRecord = (accountId: string, appName: string, json: any): FormattedSchema => {
  const ajv = new Ajv({
    allErrors: true
  })

  if (!json.title) {
    throw new BadRequest('schema must include the title field')
  }

  try {
    ajv.compile(json)
  } catch (e) {
    console.log(e)
    throw new BadRequest(`invalid json schema format for schema: ${json.title}`)
  }

  return {
    appName,
    accountId,
    json: JSON.stringify(json),
    name: json.title
  }
}

// This is a skeleton for a custom service class. Remove or add the methods you need here
export class SchemasV1Service<ServiceParams extends SchemasV1Params = SchemasV1Params>
  implements ServiceInterface<SchemasV1, SchemasV1Data, ServiceParams, SchemasV1Patch>
{
  constructor(public options: SchemasV1ServiceOptions) {}

  async create(data: SchemasV1Data, params?: ServiceParams): Promise<any> {
    data.accountId = params?.user?.accountId!

    if (!data.accountId || !data.appName || !data.jsonArray) {
      throw new BadRequest('missing accountId, appName, or jsonArray')
    }

    // validate schemas and set name and build a map based on title
    const formattedSchemas = data.jsonArray.map((j) => formatSchemaRecord(data.accountId, data.appName, j))

    const sentSchemaMap = formattedSchemas.reduce((acc: Record<string, FormattedSchema>, curr) => {
      acc[curr.name] = curr
      return acc
    }, {})

    // fetch all schemas for the given app
    const existingSchemas = await this.options.app.service<'schema/v1'>('schema/v1').find({
      query: {
        accountId: data.accountId,
        appName: data.appName,
        $limit: 1000
      }
    })

    // build a map based on schema title
    const existingSchemaMap = existingSchemas.data.reduce((acc: Record<string, any>, curr: any) => {
      acc[curr.name] = curr
      return acc
    }, {})

    const toDelete: Promise<any>[] = []
    const toCreate: Promise<any>[] = []
    const toPatch: Promise<any>[] = []

    // Loop through existing schemas and check payload schema map to see if any have been removed, if they have add it to a promise array of schemas to remove
    existingSchemas.data.forEach((s) => {
      if (!sentSchemaMap[s.name]) {
        console.log('DELETING ' + s.name)

        const promise = this.options.app.service('schema/v1').remove(s._id)

        toDelete.push(promise)
      }
    })

    // loop through schemas sent
    formattedSchemas.forEach((s) => {
      const existing = existingSchemaMap[s.name]

      if (!existing) {
        console.log('CREATING ' + s.name)

        const promise = this.options.app.service('schema/v1').create(s)

        toCreate.push(promise)
      } else {
        // check if diff
        if (s.json !== existing.json) {
          console.log('PATCHING ' + s.name)

          const promise = this.options.app.service('schema/v1').patch(existing._id, { json: s.json })

          toPatch.push(promise)
        }
      }
    })

    await Promise.all([...toDelete, ...toPatch, ...toCreate])

    return { message: 'ok' }
  }
}

export const getOptions = (app: Application) => {
  return { app }
}
