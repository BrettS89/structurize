// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import assert from 'assert'
import { app } from '../../../../../src/app'

describe('security/account/v1 service', () => {
  it('registered the service', () => {
    const service = app.service('security/account/v1')

    assert.ok(service, 'Registered the service')
  })
})
