const {
  withUiHook,
} = require('@zeit/integration-utils')
const {
	createWebhook,
	deleteWebhook,
} = require('./services/integration')
const {
	exchangeToken,
} = require('./services/slack')
const {
  setupView,
  sucessView,
} = require('./views')


module.exports = withUiHook (async ({ payload, zeitClient }) => {
	const {
    action,
		configurationId,
		query,
	} = payload
	
	const isSlackRedirect = query && query.code

	if (isSlackRedirect) {
		const { incoming_webhook } = await exchangeToken(query.code, configurationId)
		if (incoming_webhook && incoming_webhook.url) {
			const slackurl = incoming_webhook.url
			await createWebhook(configurationId, slackurl)
			await zeitClient.setMetadata({ done: true })
		}
	}

	if (action === 'reset') {
    await deleteWebhook(configurationId)
		await zeitClient.setMetadata({ done: false })
	}

	const store = await zeitClient.getMetadata()

  return store.done ? sucessView() : setupView(configurationId)
})