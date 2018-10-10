import { RequestHandler } from '../extension/clova-extension-client';
import * as Clova from '@line/clova-cek-sdk-nodejs/dist';

export class SessionEndedHandler implements RequestHandler {

  canHandle(responseHelper: Clova.Context) {
    return true;
  }

  handle(responseHelper: Clova.Context) {
    const sessionId = responseHelper.getSessionId();
    console.log('END SESSION', sessionId);
    responseHelper.endSession();
  }
};