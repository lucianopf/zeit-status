const fetch = require('node-fetch')
const qs = require('qs')

const {
	SLACK_CLIENT_ID,
	SLACK_CLIENT_SECRET,
	SLACK_REDIRECT_URI,
} = process.env

async function exchangeToken (code, configurationId) {
  const options = {
    method: 'POST',
    data: {
			client_id: SLACK_CLIENT_ID,
			client_secret: SLACK_CLIENT_SECRET,
			code,
			redirect_uri: `${SLACK_REDIRECT_URI}/${configurationId}`,
    },
  }
	let url = 'https://slack.com/api/oauth.access'

	options.headers = options.headers || {}

	if (options.data) {
		options.headers = {
			...options.headers,
			'Content-Type': 'application/x-www-form-urlencoded'
		}
		options.body = qs.stringify(options.data)
	}

	const res = await fetch(url, options)
		if (res.status !== 200) {
			throw new Error(
				`Failed API call. path: ${url} status: ${
					res.status
				} error: ${await res.text()}`
			)
		}

	return res.json()
}

module.exports = {
  exchangeToken,
}