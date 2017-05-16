import * as BotBuilder from 'botbuilder';

import qna from './qna';

let library = new BotBuilder.Library('qna');

library.dialog('qna', qna).triggerAction({
    matches: 'qna'
});

export default library;
