import mongoose from 'mongoose'
import {
  Article, Pesel, StringIdDocument, User,
} from './models.js'

const dropAllCollections = async (): Promise<void> => {
  await mongoose.connect('mongodb://localhost/e2e_test', {})
  await Promise.all([
    Pesel.deleteMany({}),
    User.deleteMany({}),
    Article.deleteMany({}),
    StringIdDocument.deleteMany({}),
  ])
}
beforeEach(dropAllCollections)
