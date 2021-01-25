const _ = require('lodash')
const uuidV5 = require('uuid/v5')
const namespace = 'a482c5af-f8d2-4f4a-86ed-978d15e95d17'

module.exports = function (config = {}) {
  const cached = {}
  const names = {}
  const reverseNames = {}
  const {
    namespace: ns = namespace,
    queries = [],
    logger = _.noop
  } = config
  addQueries(queries)

  return {
    addQueries,
    byName,
    createId,
    getName,
    queryId
  }

  function addQueries (queries) {
    if (_.isArray(queries)) {
      queries.forEach((query) => {
        const id = queryId(query)
        cached[query] = id
        // no name associated
      })
    } else if (_.isObject(queries)) {
      _.forOwn(queries, (query, name) => {
        const id = queryId(query)
        cached[query] = id
        names[name] = id
        reverseNames[query] = name
        logger(name, id)
      })
    }
  }

  function getName (key) {
    return names[key] || reverseNames[key] || 'notdefined'
  }

  function byName (text) {
    return names[text] || text
  }

  function queryId (text) {
    const named = names[text]
    if (named) {
      return named
    }
    const cache = cached[text]
    if (cache) {
      return cache
    }
    const id = createId(text)
    cached[text] = id
    return id
  }

  function createId (text) {
    return uuidV5(text, ns)
  }
}
