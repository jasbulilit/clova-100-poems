import * as Clova from '@line/clova-cek-sdk-nodejs/dist';
import { AnswerIntentUtterance as Utterance } from '../utterances/answer-intent-utterance';
import { Handler } from './handler';
import { PoemService } from '../services/poem-service';

export class AnswerIntentHandler extends Handler {
  intentName = 'AnswerIntent'

  public canHandle(responseHelper: Clova.Context) {
    const intentName = responseHelper.getIntentName();
    const attr = responseHelper.getSessionAttributes();
    if (! intentName) {
      return false;
    }
    if (attr.game != 'Quiz' && attr.game != 'Nagashi') {
      return false;
    }
    return intentName == this.intentName || intentName == 'Clova.GuideIntent';
  }

  protected postHandle(responseHelper: Clova.Context) {
    const attr = responseHelper.getSessionAttributes();
    attr.index++;
    responseHelper.setSessionAttributes(attr);
  }

  getSpeechOutput(responseHelper) {
    const attr = responseHelper.getSessionAttributes();
    const poemService = (new PoemService(attr.sequence, attr.index)).next();
    let answer = null;
    switch (attr.game) {
      case 'Quiz':
        answer = responseHelper.getSlot('author');
        break;
      case 'Nagashi':
        answer = responseHelper.getSlot('keyword');
        break;
      default:
        throw Error('Invalid Game for AnswerIntent.');
    }
    return (new Utterance).respond(attr.game, poemService, answer);
  }
};