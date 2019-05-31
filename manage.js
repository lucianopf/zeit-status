const express = require('express')
const { json } = require('body-parser')
const database = require('./lib/database')

const app = express()

const urlPrefix = 'hooks.slack.com/services'

app.use(json())

app.post('*', async (req, res) => {
  const { body } = req

  const { integrationId, webhookUrl } = body

  if (!integrationId || !webhookUrl) {
    return res.status(400).send('Excpeted params integrationId and webhookUrl.')
  }

  if (!webhookUrl.includes(urlPrefix)) {
    return res.sendStatus(400)
  }

  await database.set(
    `integrations/${integrationId}`,
    JSON.stringify(webhookUrl)
  )

  return res.json({ message: 'ok' })
})

app.delete('*', async (req, res) => {
  const { query } = req

  const { integrationId } = query

  if (!integrationId) {
    return res.status(400).send('Excpeted params integrationId and webhookUrl.')
  }

  await database.deleteItem(
    `integrations/${integrationId}`
  )

  return res.json({ message: 'ok' })
})


module.exports = app
