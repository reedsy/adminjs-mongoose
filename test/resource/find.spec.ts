import AdminJS, { BaseRecord, Filter } from 'adminjs'
import { factory } from 'factory-girl'
import Resource from '../../src/resource.js'
import { StringIdDocument, User } from '../utils/models.js'

describe('Resource #find', () => {
  it('returns first n items', async () => {
    await factory.createMany('user', 10)
    const resource = new Resource(User)
    const limit = 5
    const offset = 0

    const returnedItems = await resource.find(new Filter({}, User), {
      limit,
      offset,
    })

    expect(returnedItems.length).toEqual(limit)
    expect(returnedItems[0]).toBeInstanceOf(BaseRecord)
  })

  it('searches by id', async () => {
    const users = await factory.createMany('user', 10)
    const resource = new Resource(User)
    const limit = 5
    const offset = 0

    const idFilters = new Filter({ _id: users[0]._id.toHexString() }, resource)
    const returnedItems = await resource.find(idFilters, { limit, offset })

    expect(returnedItems.length).toEqual(1)
    expect(returnedItems[0]).toBeInstanceOf(BaseRecord)
  })

  describe('with exactMatch properties', () => {
    const exactMatch = { custom: { exactMatch: true } }

    beforeEach(async () => {
      await factory.create('user', { email: 'john@doe.com' })
      await factory.create('user', { email: 'john@doe.com.au' })
    })

    it('matches strings by equality instead of a regex', async () => {
      const resource = new Resource(User)
      resource.assignDecorator(new AdminJS(), { properties: { email: exactMatch } })

      const filter = new Filter({ email: 'john@doe.com' }, resource)
      const returnedItems = await resource.find(filter, {})

      expect(returnedItems.map((item) => item.params.email)).toEqual(['john@doe.com'])
    })

    it('matches a string _id', async () => {
      await StringIdDocument.create([{ _id: 'abc' }, { _id: 'abcd' }])
      const resource = new Resource(StringIdDocument)
      resource.assignDecorator(new AdminJS(), { properties: { _id: exactMatch } })

      const filter = new Filter({ _id: 'abc' }, resource)
      const returnedItems = await resource.find(filter, {})

      expect(returnedItems.map((item) => item.id())).toEqual(['abc'])
    })

    it('keeps the regex for other properties', async () => {
      const resource = new Resource(User)
      resource.assignDecorator(new AdminJS(), { properties: { passwordHash: exactMatch } })

      const filter = new Filter({ email: 'john@doe.com' }, resource)
      const returnedItems = await resource.find(filter, {})

      expect(returnedItems).toHaveLength(2)
    })
  })
})
