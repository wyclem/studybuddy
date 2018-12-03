import { Note } from './note-model';

export class Group {

  private groupName: string;
  private groupKey: string;
  private members: string[];

  constructor(name: string, key: string, members: string[]) {
    this.groupName = name;
    this.groupKey = key;
    this.members = members;
  }

  setName(newName: string) {
    this.groupName = newName;
  }

  setMembers(newMembers: string[]) {
    this.members = newMembers;
  }

  getName() {
    return this.groupName;
  }

  getKey() {
    return this.groupKey;
  }

  getMembers() {
    return this.members;
  }

}
