import { poems } from './poem';
import { config } from '../config';

// Fisher–Yates Shuffle
function shuffle(array) {
  for (var i = array.length - 1; i >= 0; i--){
    var rand = Math.floor(Math.random() * (i + 1));
    [array[i], array[rand]] = [array[rand], array[i]]
  }
  return array;
}

export class Poem {
  public no;
  public poem;
  public yomi;
  public author;
  public authorYomi;
  public identChars;

  constructor(poem) {
    this.no = poem.id;
    this.poem = poem.poem;
    this.yomi = poem.yomi;
    this.author = poem.author;
    this.authorYomi = poem.authorYomi;
    this.identChars = poem.identChars;
  }

  public getPormArray(yomi?) {
    return (yomi)
      ? this.yomi.split(' ')
      : this.poem.split(' ');
  }

  public getFirstPart() {
    return config.audioBaseUrl + 'poem-' + this.no + 'a.mp3';
  }

  public getLastPart() {
    return config.audioBaseUrl + 'poem-' + this.no + 'b.mp3';
  }

  public getFull(type?) {
    type = type || 'easy';
    return (type)
      ? config.audioBaseUrl + type + '/poem-' + this.no + '.mp3'
      : config.audioBaseUrl + 'poem-' + this.no + '.mp3';
  }

  public getType() {
    if ([8, 10, 12, 21, 47, 66, 69, 70, 82, 85, 86, 87, 95].indexOf(this.no) >= 0) {
      return '坊主';
    } else if ([2, 9, 19, 38, 53, 54, 56, 57, 58, 59, 60, 61, 62, 65, 67, 72, 80, 88, 89, 90, 92].indexOf(this.no) >= 0) {
      return '姫';
    }
    return null;
  }
}

export class PoemService {
  private sequence: number[];
  private index: number;

  constructor(sequence?, index?) {
    this.sequence = sequence || this.initSequence();
    this.index = index || 0;
  }

  getPoem(id: number): Poem|null {
    return (poems[id]) ? new Poem(poems[id]) : null;
  }

  findPoem(query: any): Poem|null {
    const poem = poems.find((item) => {
      if (query.author == item.author) {
        return true;
      }
      return false;
    });
    return (poem) ? new Poem(poem) : null;
  }

  shuffle() {
    this.index = 0;
    this.sequence = shuffle(this.getSequence());
    return this;
  }

  getSequence() {
    return this.sequence;
  }

  getIndex() {
    return this.index;
  }

  getCurrentId(): number {
    return this.sequence[this.index];
  }

  getPrevId(): number {
    return (this.index > 0) ? this.sequence[this.index - 1] : null;
  }

  next() {
    if (this.index < this.sequence.length) {
      this.index++;
    }
    return this;
  }

  private initSequence() {
    const sequence = [];
    for (var i = 1; i <= 100; i++) {
      sequence.push(i);
    }
    return sequence;
  }
}