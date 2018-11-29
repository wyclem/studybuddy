import { Note } from './note-model';

export class Group {

  private groupName: string;
  private groupKey: string;

  constructor(name: string, key: string) {
    this.groupName = name;
    this.groupKey = key;
  }

  setName(newName: string) {
    this.groupName = newName;
  }

  getName() {
    return this.groupName;
  }

  getKey() {
    return this.groupKey;
  }

}
