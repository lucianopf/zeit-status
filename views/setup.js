const { htm } = require('@zeit/integration-utils')

const { SLACK_CLIENT_ID } = process.env

const slackAuthorizeUrl = configurationId => `https://slack.com/oauth/authorize?client_id=${SLACK_CLIENT_ID}&scope=incoming-webhook team:read&redirect_uri=https://zeit.co/dashboard/integrations/${configurationId}`

const zeitStatusTwitterUrl = 'https://twitter.com/zeit_status'

module.exports = (configurationId) => htm`
  <Page>
    <Box display="flex" flexDirection="column" justifyContent="center" textAlign="center">
      <H1>Welcome to zeit-status integration</H1>
      <P>
        In order for us to send you <Link href=${zeitStatusTwitterUrl} target="_blank">@zeit_status</Link> tweets we'll need you to authorize this integration at your Slack
      </P>
      <BR />
      <Box display="flex" marginTop="10px" justifyContent="center">
        <Link href=${slackAuthorizeUrl(configurationId)}>
          <Button>Connect to Slack</Button>
        </Link>
      </Box>
    </Box>
  </Page>
`