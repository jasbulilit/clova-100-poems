import * as Clova from '@line/clova-cek-sdk-nodejs/dist';
import { ErrorUtterance as Utterance } from '../utterances/error-utterance';
import { IErrorHandler } from '../extension/clova-extension-client';

export class ErrorHandler implements IErrorHandler {
  canHandle(responseHelper: Clova.Context, error: Error) {
    return true;
  }

  handle(responseHelper: Clova.Context, error: Error) {
    console.error(error);

    const speechOutput = (new Utterance).respond();
    responseHelper.setSimpleSpeech(Clova.SpeechBuilder.createSpeechText(speechOutput.speech))
    if (speechOutput.repromptSpeech) {
      responseHelper.setSimpleSpeech(Clova.SpeechBuilder.createSpeechText(speechOutput.repromptSpeech), true);
    }
  }
};