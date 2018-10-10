import { UtteranceBase, SpeechBase } from './utterance';
import { gameUtteranceFactory } from './game-utterance';
import { speechString } from './speech';

export class NextIntentUtterance extends UtteranceBase {
  public respond(game, poemService, mode): SpeechBase {
    try {
      const gameUtterance = gameUtteranceFactory(game, poemService, mode);
      if (! gameUtterance.valid()) {
        return {
          speech: speechString.endCard()
        }
      }

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