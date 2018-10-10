import { UtteranceBase, SpeechBase } from './utterance';
import { speechAudio } from './speech';

export class WaitIntentUtterance extends UtteranceBase {
  public respond(): SpeechBase {
    return {
      speech: speechAudio.rest,
      repromptSpeech: speechAudio.rest
    };
  }
}