import { UtteranceBase, SpeechBase } from './utterance';
import { speechString } from './speech';

export class EndGameIntentUtterance extends UtteranceBase {
  public respond(): SpeechBase {
    return {
      speech: [
        speechString.endKaruta()
      ]
    };
  }
}