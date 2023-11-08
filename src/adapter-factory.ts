/* eslint-disable max-classes-per-file */
import { Database } from './database'
import { IAdapterOptions } from './i-adapter-options'
import { IDatabaseConstructor } from './i-database-constructor'
import { IResourceConstructor } from './i-resource-constructor'
import { Resource } from './resource'

type IReturnType = {
  Resource: IResourceConstructor
  Database: IDatabaseConstructor
}

export function adminJsAdapterFactory(options: IAdapterOptions): IReturnType {
  class ConfiguredResource extends Resource {
    protected readonly options = options
  }

  class ConfiguredDatabase extends Database {
    protected readonly ResourceClass = ConfiguredResource

    protected readonly options = options
  }

  return {
    Resource: ConfiguredResource,
    Database: ConfiguredDatabase,
  }
}
