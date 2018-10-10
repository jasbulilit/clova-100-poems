import * as Clova from '@line/clova-cek-sdk-nodejs/dist';
import { ChangeModeIntentUtterance as Utterance } from '../utterances/change-mode-intent-utterance';
import { Handler } from './handler';

export class ChangeModeIntentHandler extends Handler {
  intentName = 'ChangeModeIntent'

  protected preHandle(responseHelper: Clova.Context) {
    const attr = responseHelper.getSessionAttributes();
    attr.mode = responseHelper.getSlot('mode') || '簡単';
    responseHelper.setSessionAttributes(attr);
  }

  getSpeechOutput(responseHelper) {
    const attr = responseHelper.getSessionAttributes();
    return (new Utterance).respond(attr.mode);
  }
};