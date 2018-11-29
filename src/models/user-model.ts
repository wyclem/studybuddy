export class User {
  private userName: string;
  private userKey: string;

  public constructor(userName: string, userKey: string) {
    this.userName = userName;
    this.userKey = userKey;
  }

  public getUserName() {
    return this.userName;
  }

  public getUserKey() {
    return this.userKey;
  }
}
