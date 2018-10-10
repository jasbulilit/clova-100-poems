import * as Clova from '@line/clova-cek-sdk-nodejs/dist';
import { RequestHandler } from '../extension/clova-extension-client';
import { SpeechBase } from '../utterances/utterance';

export abstract class Handler implements RequestHandler {
  protected intentName : string;

  constructor() {
  }

  public canHandle(responseHelper: Clova.Context) {
    const intentName = responseHelper.getIntentName();
    if (! intentName) {
      return true;
    }
    return intentName == this.intentName;
  }

  public handle(responseHelper: Clova.Context) {
    this.preHandle(responseHelper);

    const speechOutput = this.getSpeechOutput(responseHelper);

    responseHelper.setSpeechList(this.prepareSpeechList(speechOutput.speech));
    if (speechOutput.repromptSpeech) {
      responseHelper.setSpeechList(this.prepareSpeechList(speechOutput.repromptSpeech), true);
    }

    this.postHandle(responseHelper);
  }

  protected preHandle(responseHelper: Clova.Context) {}

  protected postHandle(responseHelper: Clova.Context) {}

  protected abstract getSpeechOutput(responseHelper?: Clova.Context) : SpeechBase;

  protected prepareSpeechList(speech: string|string[]) {
    const list = [];

    if (typeof speech == 'string') {
      speech = [speech]; 
    }
    speech.forEach((output) => {
      if (output.match(/^https?:\/\/.+?\.mp3$/)) {
        list.push(Clova.SpeechBuilder.createSpeechUrl(output));
      } else if (output) {
        list.push(Clova.SpeechBuilder.createSpeechText(output));
      }
    });
    return list;
  }
};