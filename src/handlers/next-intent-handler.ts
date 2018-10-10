import * as Clova from '@line/clova-cek-sdk-nodejs/dist';
import { NextIntentUtterance as Utterance } from '../utterances/next-intent-utterance';
import { Handler } from './handler';
import { PoemService } from '../services/poem-service';

export class NextIntentHandler extends Handler {
  intentName = 'NextIntent'

  protected postHandle(responseHelper: Clova.Context) {
    const attr = responseHelper.getSessionAttributes();
    attr.index++;
    responseHelper.setSessionAttributes(attr);
  }

  getSpeechOutput(responseHelper) {
    const attr = responseHelper.getSessionAttributes();
    const poemService = (new PoemService(attr.sequence, attr.index)).next();
    return (new Utterance).respond(attr.game, poemService, attr.mode);
  }
};