import { GuideIntentUtterance as Utterance } from '../utterances/guide-intent-utterance';
import { Handler } from './handler';

export class GuideIntentHandler extends Handler {
  intentName = 'Clova.GuideIntent'

  getSpeechOutput(responseHelper) {
    const attr = responseHelper.getSessionAttributes();
    return (new Utterance).respond(attr.game);
  }
};