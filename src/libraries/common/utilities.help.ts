import * as builder from 'botbuilder';

const dialog: builder.IDialogWaterfallStep[] = [
    (session: builder.Session, args: builder.IRecognizeContext, skip: Function) => {
        // TODO this is still hardcoded. use buttons.
        let promptOptions: builder.IPromptChoiceOptions = {
            maxRetries: 2
        };
        let choices = ['option 1', 'option 2'];
        let keyboard = new builder.Keyboard(session).buttons(
            choices.map(choice => builder.CardAction.imBack(session, session.gettext(choice), choice))
        );

        let message = new builder.Message(session)
            .text('I can do some things')
            .addAttachment(keyboard);

        builder.Prompts.choice(session, message, choices, promptOptions);

    },
    (session: builder.Session, result: builder.IPromptChoiceResult, skip: Function) => {
        if (result.resumed === builder.ResumeReason.completed) {
            session.endDialog('Done');
        } else {
            session.endDialog('Ok');
        }
    }
];

export default dialog;
