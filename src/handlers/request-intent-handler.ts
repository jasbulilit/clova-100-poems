import { RequestIntentUtterance as Utterance } from '../utterances/request-intent-utterance';
import { Handler } from './handler';

export class RequestIntentHandler extends Handler {
  intentName = 'RequestIntent'

  getSpeechOutput(responseHelper) {
    const author = responseHelper.getSlot('author');
    const number = responseHelper.getSlot('number');
    return (new Utterance).respond(author, number);
  }
};