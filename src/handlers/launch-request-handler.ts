import { LaunchRequestUtterance as Utterance } from '../utterances/launch-request-utterance';
import { Handler } from './handler';

export class LaunchRequestHandler extends Handler {

  protected getSpeechOutput() {
    return (new Utterance).respond();
  }
};