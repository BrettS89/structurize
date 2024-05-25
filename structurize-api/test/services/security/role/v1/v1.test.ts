// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import assert from 'assert'
import { app } from '../../../../../src/app'

describe('security/role/v1 service', () => {
  it('registered the service', () => {
    const service = app.service('security/role/v1')

    assert.ok(service, 'Registered the service')
  })
})
