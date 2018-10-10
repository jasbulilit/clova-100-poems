export interface SpeechBase {
  /**
   * 応答
   */
  speech: any;

  /**
   * リプロンプト
   */
  repromptSpeech?: any;

}

export abstract class UtteranceBase {
  /**
   * レスポンス生成
   */
  public abstract respond(...args: any[]): SpeechBase;
}
