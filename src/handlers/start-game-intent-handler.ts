import * as Clova from '@line/clova-cek-sdk-nodejs/dist';
import { StartGameIntentUtterance as Utterance } from '../utterances/start-game-intent-utterance';
import { Handler } from './handler';
import { PoemService } from '../services/poem-service';

export class StartGameIntentHandler extends Handler {
  intentName = 'StartGameIntent'

  protected preHandle(responseHelper: Clova.Context) {
    const game = responseHelper.getSlot('game');
    const mode = responseHelper.getSlot('mode');
    const attr = responseHelper.getSessionAttributes();
    attr.sequence = (new PoemService()).shuffle().getSequence();
    attr.index = 0;
    if (mode) {
      attr.mode = mode;
    }

    switch (game) {
      case '作者クイズ':
        attr.game = 'Quiz';
        attr.score = 0;
        break;
      case '札流し':
        attr.game = 'Nagashi';
        break;
      case '百人一首':
      default:
        attr.game = 'Karuta';
        break;
    }
    responseHelper.setSessionAttributes(attr);
  }
  
  getSpeechOutput(responseHelper) {
    const attr = responseHelper.getSessionAttributes();
    const poemService = new PoemService(attr.sequence);
    return (new Utterance).respond(attr.game, poemService, attr.mode);
  }
};