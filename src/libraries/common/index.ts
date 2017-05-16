import * as BotBuilder from 'botbuilder';

import none from './none';
import help from './utilities.help';
import greeting from './common.greeting';

let library = new BotBuilder.Library('common');

library.dialog('none', none).triggerAction({
    matches: 'None'
});

library.dialog('help', help).triggerAction({
    matches: 'Utilities.Help'
});

library.dialog('greeting', greeting).triggerAction({
    matches: 'common.greeting'
});

export default library;
