import { Resource } from './resource'

// eslint-disable-next-line no-unused-vars
export type IResourceConstructor = new (mongooseModel: any) => Resource
