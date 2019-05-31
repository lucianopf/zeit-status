const { htm } = require('@zeit/integration-utils')

module.exports = () => htm`
  <Page>
    <H1>Setup:</H1>
    <P>In order to subscribe to @zeit_status tweets at your slack we'll need a Slack webhook url</P>
    <Container>
      <Input label="Slack webhook url" name="slackurl" type="text"/>
    </Container>
    <Container>
      <Button action="submit">
        Login
      </Button>
    </Container>
  </Page>
`