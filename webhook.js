const express = require('express')
const { json, urlencoded } = require('body-parser')
const axios = require('axios')
const { map } = require('bluebird')
const database = require('./lib/database')

const zeitStatusImage = 'https://pbs.twimg.com/profile_images/784360755319697408/cw6zhtGK_400x400.jpg'

const app = express()

app.use(json())
app.use(urlencoded())

function sendSlackMessage(integration, message) {
  return axios.post(integration.url, message)
    .catch(() => console.log(`Erroed for integration ${integration.id}`))
}

app.post('*', async (req, res) => {
  const { body, query } = req
  const { username, content, link } = body
  const { password, id } = query 

  const incorrectPassword = password !== process.env.WEBHOOK_PASSWORD
  const incorrectId = id !== process.env.WEBHOOK_ID

  if (incorrectPassword || incorrectId) {
    return res.sendStatus(403)
  }

  if (!username || !content || !link) {
    return res.sendStatus(400)
  }

  const slackMessage = {
    username: username.replace('@', '').toUpperCase(),
    icon_url: zeitStatusImage,
    attachments: [
      {
        fallback: `[${username}]: ${content.trim()}`,
        color: 'warning',
        title: `${username}:`,
        title_link: link,
        text: `${content.trim()}`,
        mrkdwn_in: ['text'],
      },
    ],
  }

  const integrations = await database.listIntegrations()

  await map(
    integrations,
    integration => sendSlackMessage(integration, slackMessage),
    { concurrency: 1 }
  )

  return res.sendStatus(200)
})

module.exports = app
