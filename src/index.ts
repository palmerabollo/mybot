import * as path from 'path';
import * as logger from 'logops';
import * as builder from 'botbuilder';
import * as restify from 'restify';

const cognitiveservices = require('botbuilder-cognitiveservices');
const lambda = require('botbuilder-aws-lambda');

import common from './libraries/common';
import qna from './libraries/qna';

import loggerMiddleware from './middlewares/logger';

let connector: builder.ConsoleConnector | builder.ChatConnector;

if (process.env.BOT_CONSOLE) {
    connector = new builder.ConsoleConnector().listen(); // stdin
} else {
    // chat connector enables communication with the MS Bot Framework Service
    connector = new builder.ChatConnector({
        appId: process.env.MICROSOFT_APP_ID,
        appPassword: process.env.MICROSOFT_APP_PASSWORD
    });

    if (process.env.AWS_LAMBDA_RUNTIME) {
        logger.info('Loading AWS Lambda handler');
        exports.handler = lambda(connector);
    } else {
        const server = restify.createServer();
        server.listen(process.env.BOT_PORT || 8080, () => {
            logger.info('Bot listening %s', server.url);
        });

        server.post('/api/messages', connector.listen()); // http
    }
}

const bot = new builder.UniversalBot(connector);

bot.set('localizerSettings', {
    botLocalePath: path.join(__dirname, '..', 'locale'),
    defaultLocale: process.env.BOT_DEFAULT_LOCALE || 'en'
});

bot.endConversationAction('cancel', 'cancel', {matches: /(^cancel$)|(^never mind$)|(^forget it$)/i});

loadBotMiddlewares(bot);
loadBotRecognizers(bot);
loadBotLibraries(bot);

////////

function loadBotRecognizers(bot: builder.UniversalBot) {
    const luisModel = process.env.BOT_LUIS_MODEL;
    let naturalLanguageRecognizer = new builder.LuisRecognizer(luisModel);
    bot.recognizer(naturalLanguageRecognizer); // luis.ai

    let qnaRecognizer = new cognitiveservices.QnAMakerRecognizer({
        knowledgeBaseId: process.env.MICROSOFT_QNA_KNOWLEDGEBASE_ID,
        subscriptionKey: process.env.MICROSOFT_QNA_SUBSCRIPTION_KEY
    });
    bot.recognizer(qnaRecognizer); // qnamaker.ai
}

function loadBotLibraries(bot: builder.UniversalBot) {
    bot.library(common);
    bot.library(qna);
}

function loadBotMiddlewares(bot: builder.UniversalBot) {
    bot.use(loggerMiddleware);
    bot.use(builder.Middleware.dialogVersion({ version: 1.0, resetCommand: /^reset/i }));
}
