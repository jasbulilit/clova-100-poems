import { UtteranceBase, SpeechBase } from './utterance';
import { speechString } from './speech';

export class ChangeModeIntentUtterance extends UtteranceBase {
  public respond(mode): SpeechBase {
    return {
      speech: speechString.changeMode(mode)
    };
  }
}