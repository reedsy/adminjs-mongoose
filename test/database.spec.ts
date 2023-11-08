import mongoose from 'mongoose'
import { Database } from './test-adapter'
import { Resource } from '../src/resource'

describe('Database', () => {
  describe('#resources', () => {
    let resources: Resource[]

    beforeEach(() => {
      resources = new Database(mongoose.connection).resources()
    })

    it('return all resources', () => {
      expect(resources.length).toEqual(3)
    })
  })
})
