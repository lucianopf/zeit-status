# Zeit Status Integration

This is an [Zeit integration](https://zeit.co/blog/zeit-now-integrations-platform) that integrates a desired Slack channel with the @zeit_status twitter profile, and it will send messages at Slack whenever there are news from Zeit Status.

## How it works

1. The user install the integration at his Zeit account.
2. The user will setup the integration, by authorizing a channel at a specific Slack.
3. This authorization will create a Slack webhook URL that will get stored in a key-value database, using it's `configurationId` as key and the actual url as value.
4. Using [IFTT](https://ifttt.com/) to send webhooks whenever the @zeit_status profile tweet, a setup "applet" will hit a lambda that will map over all setup `configurationId` available and send each one a slack message containing the Tweet content. 


## Screens

![setup_1](https://integration-assets.zeit.sh/https%3A%2F%2Ffiles-yhbgzesnvm.now.sh%2FScreen%2520Shot%25202019-06-02%2520at%252016.45.39.png)

![setup_2](https://integration-assets.zeit.sh/https%3A%2F%2Ffiles-yhbgzesnvm.now.sh%2FScreen%2520Shot%25202019-06-02%2520at%252016.46.59.png)

![setup_3](https://integration-assets.zeit.sh/https%3A%2F%2Ffile-wkofordmka.now.sh%2F)