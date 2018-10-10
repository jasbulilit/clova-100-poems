import { UtteranceBase, SpeechBase } from './utterance';
import { speechString } from './speech'

export class HelpIntentUtterance extends UtteranceBase {
  public respond(game): SpeechBase {
    const speech = [];
    switch (game) {
      case '作者クイズ':
        speech.push(speechString.helpQuiz());
        break;
      case '札流し':
        speech.push(speechString.helpNagashi());
        break;
      case '百人一首':
        speech.push(speechString.helpKaruta());
        break;
      default:
        speech.push(speechString.helpGame());
        break;
    }
    return {
      speech: speech
    };
  }
}