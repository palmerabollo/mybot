/**
* @license
* Copyright 2016 Telefónica I+D
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import * as builder from 'botbuilder';
import * as logger from 'logops';

/**
 * Logs the messages received/sent by the bot
 */
export default {
    builder: (session: builder.Session, next: Function) => {
        logger.info(session.sessionState, 'Session');
        next();
    },
    receive: (event: builder.IEvent, next: Function) => {
        logger.info(event, 'Message IN');
        next();
    },
    send: (event: builder.IEvent, next: Function) => {
        logger.info(event, 'Message OUT');
        next();
    }
} as builder.IMiddlewareMap;