import * as functions from 'firebase-functions';
import * as Clova from '@line/clova-cek-sdk-nodejs/dist';
import * as Express from 'express';
import * as bodyParser from 'body-parser';
import * as Handlers from './handlers';
import { config } from './config'

const app = Express();
const clovaHandler : any = Clova.Client
  .configureSkill()
  .onLaunchRequest(responseHelper => {
    (new Handlers.LaunchRequestHandler).handle(responseHelper);
  })
  .onIntentRequest(Handlers.intentHandlers)
  .onSessionEndedRequest(responseHelper => {
    (new Handlers.SessionEndedHandler).handle(responseHelper)
  })
  .firebase();

export const handle = clovaHandler;
const clovaMiddleware = Clova.Middleware({ applicationId: config.appId });
app.post('/', clovaMiddleware, clovaHandler);
app.post('/', bodyParser.json(), clovaHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

export const clova = functions.https.onRequest(app);