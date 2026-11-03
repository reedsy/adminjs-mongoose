import escape from 'escape-regexp'
import mongoose from 'mongoose'

/**
 * Changes AdminJS's {@link Filter} to an object acceptible by a mongoose query.
 *
 * @param {Filter} filter
 * @param {Function} isExactMatch whether a path is compared by equality, whatever its type
 * @private
 */
// eslint-disable-next-line no-unused-vars
export const convertFilter = (filter, isExactMatch: (path: string) => boolean = () => false) => {
  if (!filter) {
    return {}
  }
  return filter.reduce((memo, filterProperty) => {
    const { property, value } = filterProperty
    if (isExactMatch(property.name())) {
      return {
        [property.name()]: value,
        ...memo,
      }
    }
    switch (property.type()) {
    case 'string':
      return {
        [property.name()]: { $regex: escape(value), $options: 'i' },
        ...memo,
      }
    case 'date':
    case 'datetime':
      if (value.from || value.to) {
        return {
          [property.name()]: {
            ...value.from && { $gte: value.from },
            ...value.to && { $lte: value.to },
          },
          ...memo,
        }
      }
      break
    case 'id':
      if (mongoose.Types.ObjectId.isValid(value)) {
        return {
          [property.name()]: value,
          ...memo,
        }
      }
      return {}
    default:
      break
    }
    return {
      [property.name()]: value,
      ...memo,
    }
  }, {})
}
