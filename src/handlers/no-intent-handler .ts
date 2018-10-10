import { WaitIntentUtterance as Utterance } from '../utterances/wait-intent-utterance';
import { Handler } from './handler';

export class NoIntentHandler extends Handler {
  intentName = 'Clova.NoIntent'

  getSpeechOutput() {
    return (new Utterance).respond();
  }
};