import { adminJsAdapterFactory } from '../src/adapter-factory'

export const { Resource, Database } = adminJsAdapterFactory({ findOneFields: ['_id'] })
