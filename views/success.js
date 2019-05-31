const { htm } = require('@zeit/integration-utils')

module.exports = () => htm`
<Page>
  <Container>
    <H2>Congratulations, you have sucessfully subscribed to @zeit_status tweets at your Slack.</H2>
  </Container>
  <Container>
    <Button action="reset" small>Reset</Button>
  </Container>
</Page>
`