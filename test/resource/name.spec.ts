import { Resource } from '../test-adapter'
import { User } from '../utils/models'

describe('Resource #name', () => {
  it('returns name of the model', () => {
    const resource = new Resource(User)

    expect(resource.name()).toEqual('User')
  })
})
