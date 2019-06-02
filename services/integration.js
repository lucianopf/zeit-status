const fetch = require('node-fetch')

async function createWebhook (configurationId, slackurl) {
  const options = {
    method: 'POST',
    data: {
      integrationId: configurationId,
      webhookUrl: slackurl,
    },
  }
	let apiPath = `${process.env.CURRENT_BASE_URL}/`

	options.headers = options.headers || {}

	if (options.data) {
		options.headers = {
			...options.headers,
			'Content-Type': 'application/json'
		};
		options.body = JSON.stringify(options.data);
	}

	const res = await fetch(apiPath, options)
		if (res.status !== 200) {
			throw new Error(
				`Failed API call. path: ${apiPath} status: ${
					res.status
				} error: ${await res.text()}`
			)
		}

	return res.json()
}

async function deleteWebhook (configurationId) {
  const options = {
    method: 'DELETE',
  }
	let apiPath = `${process.env.CURRENT_BASE_URL}/?integrationId=${configurationId}`

	options.headers = options.headers || {}

	const res = await fetch(apiPath, options)
		if (res.status !== 200) {
			throw new Error(
				`Failed API call. path: ${apiPath} status: ${
					res.status
				} error: ${await res.text()}`
			)
		}

	return res.json()
}

module.exports = {
  createWebhook,
  deleteWebhook,
}