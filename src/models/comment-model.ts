export class Comment {
  private userName: string;
  private userKey: string;
  private text: string;

  public constructor(userName: string, userKey: string, text: string) {
    this.userName = userName;
    this.userKey = userKey;
    this.text = text;
  }

  public getUserName() {
    return this.userName;
  }

  public getUserKey() {
    return this.userKey;
  }

  public getText() {
    return this.text;
  }

}
