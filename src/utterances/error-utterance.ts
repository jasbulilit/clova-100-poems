import { UtteranceBase, SpeechBase } from './utterance';
import { speechString } from './speech';

/**
 * エラー
 */
export class ErrorUtterance extends UtteranceBase {
  public respond(): SpeechBase {
    return {
      speech: speechString.unhandledMessage()
    };
  }
}