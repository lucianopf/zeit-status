const {
  withUiHook,
} = require('@zeit/integration-utils')
const {
	createWebhook,
	deleteWebhook,
} = require('./services/integration')
const {
  setupView,
  sucessView,
} = require('./views')


module.exports = withUiHook (async ({ payload, zeitClient }) => {
	const {
		clientState,
    action,
    integrationId,
  } = payload
  
	const {
		slackurl,
	} = clientState

	const isSubmitAction = action === 'submit'
	const isResetAction = action === 'reset'
	const isValidPayload = slackurl && slackurl.length

	if (isSubmitAction && isValidPayload) {
    await createWebhook(integrationId, slackurl)
    await zeitClient.setMetadata({ done: true })
	} else if (isResetAction) {
    await deleteWebhook(integrationId)
		await zeitClient.setMetadata({ done: false })
	}

	const store = await zeitClient.getMetadata()

  return store.done ? sucessView() : setupView()
})