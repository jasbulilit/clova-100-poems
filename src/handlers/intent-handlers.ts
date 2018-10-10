import * as Clova from '@line/clova-cek-sdk-nodejs/dist';
import { ClovaExtensionClient } from '../extension/clova-extension-client';
import * as Handlers from './index';

export const intentHandlers = async (responseHelper: Clova.Context) => {
  const clova = new ClovaExtensionClient()
    .addRequestHandlers(
      new Handlers.StartGameIntentHandler,
      new Handlers.NextIntentHandler,
      new Handlers.ReplayIntentHandler,
      new Handlers.AnswerIntentHandler,
      new Handlers.ChangeModeIntentHandler,
      new Handlers.RequestIntentHandler,
      new Handlers.EndGameIntentHandler,
      new Handlers.HelpIntentHandler,
      new Handlers.YesIntentHandler,
      new Handlers.NoIntentHandler,
      new Handlers.StartGameIntentHandler,
      new Handlers.CancelIntentHandler,
      new Handlers.GuideIntentHandler,
    ).addErrorHandlers(
      new Handlers.ErrorHandler
    );

  await clova.invoke(responseHelper);
};