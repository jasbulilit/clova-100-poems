import { config } from '../config'

function getRandomString(strings: string[]) : string {
  const index = Math.floor(Math.random() * strings.length);
  return strings[index];
}

export const speechAudio = {
  rest: config.audioBaseUrl + 'silent_1s.mp3',
  ticking: config.audioBaseUrl + 'ticking.mp3',
  chim: config.audioBaseUrl + 'chim.mp3',
  blip: config.audioBaseUrl + 'blip.mp3'
}

export const speechString = {
  welcome(): string {
    return getRandomString([
      config.appName + 'はかるたの読み札を読んだり、作者クイズができます。',
      config.appName + 'で一緒に遊びましょう。',
      config.appName + 'です。何をして遊びますか。'
    ]);
  },
  guide(): string {
    return '操作方法が知りたい場合は、「遊び方を教えて」と言ってください。';
  },
  askForNext(): string {
    return '次の歌を読んでいいですか？';
  },
  helpGame(): string {
    return speechString.helpKaruta(); // TODO:
  },
  helpKaruta(): string {
    return 'かるたをする場合は、「かるたスタート」と言ってください。'
      + '取り札を見つけたら、「取りました」と言ってください。'
      + '再度読み札を読む場合は、「もう一回読んで」と言ってください。';
  },
  helpQuiz(): string {
    return '作者クイズをする場合は、「作者クイズスタート」と言ってください。'
      + '「次の問題」というと、別の句を読みます。';
  },
  helpNagashi(): string {
    return 'ふだ流しをする場合は、「ふだ流しスタート」と言ってください。'
      + '「次の問題」というと、別の句を読みます。';
  },
  unhandledMessage(): string {
    return getRandomString([
      'すみません。もう一度行ってください。',
      'ごめんなさい。よく聞きとれませんでした。'
    ]);
  },
  startKaruda(): string {
    return 'それでは百人一首を始めます。';
  },
  startQuiz(): string {
    return 'それでは作者クイズを始めます。かるたを読みますので、作者を当ててください。';
  },
  startLeaning(): string {
    return 'かみの句を読みますので、しもの句を当ててください。';
  },
  startNagashi(): string {
    return 'しもの句の冒頭を読みますので、決まり字をこたえてください。';
  },
  nextQuiz(): string {
    return '次の問題です。'
  },
  endKaruta(): string {
    return 'これで終わります。ありがとうございました。';
  },
  endCard(): string {
    return 'もうかるたがありません。すべてのかるたを読みました。';
  },
  correctAnswer(): string {
    return getRandomString([
      '正解です！',
      'すごい！',
      'さすがですね！'
    ]);
  },
  tellAnswer(answer): string {
    return getRandomString([
      `答えは${answer}です。`,
      `正解は${answer}でした。`
    ]);
  },
  changeMode(mode): string {
    return `${mode}モードにしました。`;
  },
  poemNotFound(): string {
    return 'すみません。歌が見つかりませんでした。'
  }
}