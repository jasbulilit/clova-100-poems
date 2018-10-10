import { speechString, speechAudio } from './speech';
import { Poem, PoemService } from '../services/poem-service';

abstract class GameUtteranceBase implements GameUtteranceInterface {
  protected poemService: PoemService;
  protected poem: Poem;

  constructor(poemService) {
    this.poemService = poemService;
    this.poem = poemService.getPoem(poemService.getCurrentId());
  }

  public abstract start();
  public abstract speech();
  public abstract reprompt();

  valid() {
    return (this.poem) ? true : false;
  }
}

class GameUtteranceKaruta extends GameUtteranceBase {
  start() {
    const prePoem = this.poemService.getPoem(0);
    const speech = [
        speechString.startKaruda(),
        speechAudio.rest,
        prePoem.getFirstPart(),
        prePoem.getLastPart()
    ];
    Array.prototype.push.apply(speech, this.speech(prePoem));
    return speech;
  }

  speech(prevPoem?) {
    prevPoem = prevPoem || this.poemService.getPoem(this.poemService.getPrevId())
    return [
      prevPoem.getLastPart(),
      speechAudio.rest,
      this.poem.getFirstPart()
    ]
  }

  reprompt() {
    return this.poem.getFirstPart();
  }
}

class GameUtteranceKarutaEasy extends GameUtteranceBase {
  start() {
    const speech = [
      speechString.startKaruda(),
      speechAudio.rest
    ];
    Array.prototype.push.apply(speech, this.speech());
    return speech;
  }

  speech() {
    return [
      this.poem.getFull('easy')
    ]
  }

  reprompt() {
    return this.poem.getFull('easy');
  }
}

class GameUtteranceQuiz extends GameUtteranceBase {
  start() {
    const speech = [
        speechString.startQuiz(),
        speechAudio.rest
    ];
    Array.prototype.push.apply(speech, this.speech());
    return speech;
  }

  speech() {
    return [
      this.poem.getFirstPart(),
      this.poem.getLastPart(),
      speechAudio.ticking
    ]
  }

  reprompt() {
    return [
      speechAudio.blip,
      speechString.tellAnswer(this.poem.authorYomi)
    ]
  }

  replyAnswer(answer) {
    const prevPoem = this.poemService.getPoem(this.poemService.getPrevId());
    const speech = []
    if (prevPoem.author == answer) {
      speech.push(speechAudio.chim)
      speech.push(speechString.correctAnswer())
    } else {
      speech.push(speechAudio.blip)
      speech.push(speechString.tellAnswer(prevPoem.author))
    }

    // Next Question
    speech.push(speechAudio.rest)
    speech.push(speechString.nextQuiz())
    Array.prototype.push.apply(speech, this.speech());
    return speech;
  }
}

class GameUtteranceNagashi extends GameUtteranceBase {
  start() {
    const speech = [
      speechString.startNagashi(),
      speechAudio.rest
    ];
    Array.prototype.push.apply(speech, this.speech());
    return speech;
  }

  speech() {
    const p = this.poem.getPormArray(true);
    return [
      p[3] + ((p[3] == 'いまひとたびの') ? ' ' + p[4].split('', 1).shift() : '')
    ]
  }

  reprompt() {
    const p = this.poem.getPormArray(true);
    return [p[3], p[4]].join(' ');
  }

  replyAnswer(answer) {
    const prevPoem = this.poemService.getPoem(this.poemService.getPrevId());
    const speech = []
    if (prevPoem.identChars == answer) {
      speech.push(speechAudio.chim)
    } else {
      speech.push(speechAudio.blip)
      speech.push(speechString.tellAnswer('「' + prevPoem.identChars + '」'))
    }
    Array.prototype.push.apply(speech, this.speech());
    return speech;
  }
}

export interface GameUtteranceInterface {
  start(): string|string[];
  speech(): string|string[];
  reprompt(): string|string[];
  valid(): boolean;
  result?(answer): boolean;
  replyAnswer?(answer): string|string[];
}

export const gameUtteranceFactory = (game, poemService, mode?): GameUtteranceInterface => {
  switch (game) {
    case 'Karuta':
      if (mode == '競技') {
        return new GameUtteranceKaruta(poemService);
      } else {
        return new GameUtteranceKarutaEasy(poemService);
      }
    case 'Quiz':
      return new GameUtteranceQuiz(poemService);
    case 'Nagashi':
      return new GameUtteranceNagashi(poemService);
    default:
      throw 'Unexpected game.'
  }
}
