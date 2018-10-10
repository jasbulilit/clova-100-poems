import { ReplayIntentUtterance as Utterance } from '../utterances/replay-intent-utterance';
import { Handler } from './handler';
import { PoemService } from '../services/poem-service';

export class ReplayIntentHandler extends Handler {
  intentName = 'ReplayIntent'

  getSpeechOutput(responseHelper) {
    const attr = responseHelper.getSessionAttributes();
    const poemService = (new PoemService(attr.sequence, attr.index));
    return (new Utterance).respond(attr.game, poemService, attr.mode);
  }
};