const { htm } = require('@zeit/integration-utils')

const zeitStatusTwitterUrl = 'https://twitter.com/zeit_status'


module.exports = () => htm`
<Page>
  <Container>
    <H2>Congratulations, you have sucessfully subscribed to @zeit_status tweets at your Slack.</H2>
    <P>You're all set now. As soon as <Link href=${zeitStatusTwitterUrl} target="_blank">@zeit_status</Link> tweet you'll receive a new Slack message at the select channel.</P>
  </Container>
  <Container>
    <Button action="reset" small>Reset</Button>
  </Container>
</Page>
`