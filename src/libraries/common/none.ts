import * as builder from 'botbuilder';

const dialog: builder.IDialogWaterfallStep[] = [
    (session: builder.Session, args: builder.IRecognizeContext, skip: Function) => {
        session.endDialog('none');
    }
];

export default dialog;
