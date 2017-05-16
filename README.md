# mybot

A virtual assistant that helps you get your time back.

## configure the bot

Export the following environment variables:

```sh
# botframework.com configuration
MICROSOFT_APP_ID=
MICROSOFT_APP_PASSWORD=
BOT_CONSOLE=
BOT_PORT=
BOT_DEFAULT_LOCALE=en

BOT_LUIS_MODEL= # luis.ai application url

# qnamaker.ai configuration for faqs
MICROSOFT_QNA_KNOWLEDGEBASE_ID=
MICROSOFT_QNA_SUBSCRIPTION_KEY=
```

## run the bot

Prerequisites: node 6+

```sh
git clone git@github.com:palmerabollo/mybot.git && cd mybot
npm install
npm run watch-console # run in console mode
```

You can also run the bot as a HTTP server os as a serverless AWS Lambda function.
