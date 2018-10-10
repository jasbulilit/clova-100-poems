import { UtteranceBase, SpeechBase } from './utterance';
import { gameUtteranceFactory } from './game-utterance';
import { speechString, speechAudio } from './speech';

export class AnswerIntentUtterance extends UtteranceBase {
  public respond(game, poemService, answer): SpeechBase {
    try {
      const gameUtterance = gameUtteranceFactory(game, poemService);
      return {
        speech: gameUtterance.replyAnswer(answer),
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