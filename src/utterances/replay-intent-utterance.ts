import { UtteranceBase, SpeechBase } from './utterance';
import { gameUtteranceFactory } from './game-utterance';
import { speechString } from './speech';

export class ReplayIntentUtterance extends UtteranceBase {
  public respond(game, poemService, mode): SpeechBase {
    try {
      const gameUtterance = gameUtteranceFactory(game, poemService, mode);
      return {
        speech: gameUtterance.speech(),
        repromptSpeech: gameUtterance.reprompt()
      }
    } catch (err) {
      console.error(err);
      return {
        speech: speechString.unhandledMessage()
      }
    }
  }
}