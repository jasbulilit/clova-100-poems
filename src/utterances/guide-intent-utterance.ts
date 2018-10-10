import { UtteranceBase, SpeechBase } from './utterance';
import { speechString } from './speech';

/**
 * Guideインテント
 */
export class GuideIntentUtterance extends UtteranceBase {
  public respond(game): SpeechBase {
    return {
      speech: (game) ? speechString.askForNext() : speechString.guide()
    };
  }
}