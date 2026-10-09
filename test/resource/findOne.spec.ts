import { BaseRecord } from 'adminjs'
import { factory } from 'factory-girl'
import mongoose from 'mongoose'
import Resource from '../../src/resource.js'
import { User } from '../utils/models.js'

describe('Resource #findOne', () => {
  it('returns the record with the given id', async () => {
    const user = await factory.create('user')
    const resource = new Resource(User)

    const record = await resource.findOne(user._id.toHexString())

    expect(record).toBeInstanceOf(BaseRecord)
    expect(record.id()).toEqual(user._id.toHexString())
  })

  it('returns null when no record has the given id', async () => {
    const resource = new Resource(User)
    const missingId = new mongoose.Types.ObjectId().toHexString()

    const record = await resource.findOne(missingId)

    expect(record).toBeNull()
  })
})
