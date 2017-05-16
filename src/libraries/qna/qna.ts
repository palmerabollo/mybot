import * as builder from 'botbuilder';

const dialog: builder.IDialogWaterfallStep[] = [
    (session: builder.Session, args: any /** XXX type */, skip: Function) => {
        session.endDialog(args.intent.answers[0].answer);
    }
];

export default dialog;
