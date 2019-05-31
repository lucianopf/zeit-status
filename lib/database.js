const axios = require('axios')

const baseURL = process.env.DATABASE_BASE_URL

function create (resource, data) {
  return axios.post(
    `${baseURL}/${resource}.json`,
    data
  )
    .then(({ data }) => data)
}

function set (resource, data) {
  return axios.put(
    `${baseURL}/${resource}.json`,
    data
  )
    .then(({ data }) => data)
}

function get (resource) {
  return axios.get(
    `${baseURL}/${resource}.json`
  )
    .then(({ data }) => data)
}

function deleteItem (resource) {
  return axios.delete(
    `${baseURL}/${resource}.json`
  )
    .then(({ data }) => data)
}

async function listIntegrations () {
  const integrations = await get('integrations')

  return Object.keys(integrations)
    .map(id => ({
      id,
      url: integrations[id],
    }))
}

module.exports = {
  create,
  set,
  deleteItem,
  get,
  listIntegrations,
}
