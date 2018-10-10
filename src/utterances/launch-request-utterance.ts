import { UtteranceBase, SpeechBase } from './utterance';
import { speechString } from './speech';

/**
 * 起動リクエスト
 */
export class LaunchRequestUtterance extends UtteranceBase {
  public respond(): SpeechBase {
    return {
      speech: [
        speechString.welcome()
      ],
      repromptSpeech: speechString.guide()
    };
  }
}