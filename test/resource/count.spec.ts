import AdminJS, { Filter } from 'adminjs'
import { factory } from 'factory-girl'
import Resource from '../../src/resource.js'
import { User } from '../utils/models.js'

describe('Resource #count', () => {
  let resource

  beforeEach(() => {
    resource = new Resource(User)
  })

  it('returns given count without filters', async () => {
    const NUMBER_OF_RECORDS = 12
    await factory.createMany('user', NUMBER_OF_RECORDS)

    const countedRecords = await resource.count(new Filter({}, resource))

    expect(countedRecords).toEqual(NUMBER_OF_RECORDS)
  })

  it('returns given count for given filters', async () => {
    const filterOutAllRecords = new Filter({
      email: 'some-not-existing-email',
    }, resource)

    const counterRecords = await resource.count(filterOutAllRecords)

    expect(counterRecords).toEqual(0)
  })

  it('counts exactMatch properties by equality', async () => {
    await factory.create('user', { email: 'john@doe.com' })
    await factory.create('user', { email: 'john@doe.com.au' })
    resource.assignDecorator(new AdminJS(), {
      properties: { email: { custom: { exactMatch: true } } },
    })

    const counted = await resource.count(new Filter({ email: 'john@doe.com' }, resource))

    expect(counted).toEqual(1)
  })
})
