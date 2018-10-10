import * as Clova from '@line/clova-cek-sdk-nodejs/dist';
import { Handler } from './handler';

export class CancelIntentHandler extends Handler {
  intentName = 'Clova.CancelIntent'

  public handle(responseHelper: Clova.Context) {
    const attr = responseHelper.getSessionAttributes();
    attr.game = null;
    responseHelper.setSessionAttributes(attr);
    responseHelper.endSession();
  }

  getSpeechOutput() {
    return null;
  }
};