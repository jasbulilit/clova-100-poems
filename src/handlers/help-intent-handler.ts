import { HelpIntentUtterance as Utterance } from '../utterances/help-intent-utterance';
import { Handler } from './handler';

export class HelpIntentHandler extends Handler {
  intentName = 'HelpIntent'

  getSpeechOutput(responseHelper) {
    const game = responseHelper.getSlot('game');
    return (new Utterance).respond(game);
  }
};