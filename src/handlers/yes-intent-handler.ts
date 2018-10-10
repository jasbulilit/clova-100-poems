import { NextIntentUtterance as Utterance } from '../utterances/next-intent-utterance';
import { ErrorUtterance } from '../utterances/error-utterance';
import { Handler } from './handler';
import { PoemService } from '../services/poem-service';

export class YesIntentHandler extends Handler {
  intentName = 'Clova.YesIntent'

  protected postHandle(responseHelper) {
    const attr = responseHelper.getSessionAttributes();
    if (attr.game) {
      attr.index++;
      responseHelper.setSessionAttributes(attr);
    }
  }

  getSpeechOutput(responseHelper) {
    const attr = responseHelper.getSessionAttributes();
    if (attr.game) {
      const poemService = (new PoemService(attr.sequence, attr.index)).next();
      return (new Utterance).respond(attr.game, poemService, attr.mode);
    } else {
      return (new ErrorUtterance).respond();
    }
  }
};