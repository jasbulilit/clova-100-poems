import { UtteranceBase, SpeechBase } from './utterance';
import { speechString } from './speech';
import { PoemService, Poem } from '../services/poem-service';

export class RequestIntentUtterance extends UtteranceBase {
  public respond(author, number): SpeechBase {
    try {
      const poemService = new PoemService();
      let poem: Poem;
      if (author) {
        poem = poemService.findPoem({author: author});
      } else if (number) {
        poem = poemService.getPoem(number);
      }

      if (poem) {
        return {
          speech: poem.getFull()
        }
      } else {
        return {
          speech: speechString.poemNotFound()
        }
      }
    } catch (err) {
      console.error(err);
      return {
        speech: speechString.unhandledMessage()
      }
    }
  }
}