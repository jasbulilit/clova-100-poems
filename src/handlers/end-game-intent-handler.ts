import { EndGameIntentUtterance as Utterance } from '../utterances/end-game-intent-utterance';
import { Handler } from './handler';

export class EndGameIntentHandler extends Handler {
  intentName = 'EndGameIntent'

  protected postHandle(responseHelper) {
    const attr = responseHelper.getSessionAttributes();
    attr.game = null;
    responseHelper.setSessionAttributes(attr);
    responseHelper.endSession();
  }

  getSpeechOutput(responseHelper) {
    return (new Utterance).respond();
  }
};