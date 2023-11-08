import { BaseDatabase } from 'adminjs'
import type { Connection } from 'mongoose'
import { IAdapterOptions } from './i-adapter-options'
import { IResourceConstructor } from './i-resource-constructor'

export abstract class Database extends BaseDatabase {
  private readonly connection: Connection

  protected abstract ResourceClass: IResourceConstructor;

  protected abstract options: IAdapterOptions

  constructor(connection) {
    super(connection)
    this.connection = connection
  }

  static isAdapterFor(connection) {
    return connection.constructor.name === 'Mongoose'
  }

  resources() {
    return this.connection.modelNames().map((name) => (
      new this.ResourceClass(this.connection.model(name))
    ))
  }
}
