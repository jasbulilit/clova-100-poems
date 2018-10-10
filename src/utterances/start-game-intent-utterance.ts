import { UtteranceBase, SpeechBase } from './utterance';
import { gameUtteranceFactory } from './game-utterance';
import { speechString } from './speech';

export class StartGameIntentUtterance extends UtteranceBase {
  public respond(game, poemService, mode): SpeechBase {
    try {
      const gameUtterance = gameUtteranceFactory(game, poemService, mode);
      return {
        speech: gameUtterance.start(),
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