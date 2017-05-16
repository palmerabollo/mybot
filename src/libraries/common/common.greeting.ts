import * as builder from 'botbuilder';

const dialog: builder.IDialogWaterfallStep[] = [
    (session: builder.Session, args: builder.IRecognizeContext, skip: Function) => {
        session.endDialog('greeting.hi');
    }
];

export default dialog;
