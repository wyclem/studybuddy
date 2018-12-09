import { Comment } from './comment-model';

export class Note {

  private noteName: string;
  private textNotes: string[];
  private imageNotes: string[];
  private groupKey: string;
  private noteKey: string;
  private ownerKey: string;
  private comments: Comment[];

  constructor(name: string, text: string[], images: string[], groupKey: string, noteKey: string, ownerKey: string, comments: Comment[]) {
    this.noteName = name;
    this.textNotes = text;
    this.imageNotes = images;
    this.groupKey = groupKey;
    this.noteKey = noteKey;
    this.ownerKey = ownerKey;
    this.comments = comments;
  }

  public setName(newName: string) {
    this.noteName = name;
  }

  public setTextNotes(newTextNotes: string[]) {
    this.textNotes = newTextNotes;
  }

  public setImageNotes(newImageNotes: string[]) {
    this.imageNotes = newImageNotes;
  }

  public setComments(newComments: Comment[]) {
    this.comments = newComments;
  }

  public getName() {
    return this.noteName;
  }

  public getTextNotes() {
    return this.textNotes;
  }

  public getImageNotes() {
    return  this.imageNotes;
  }

  public getGroupKey() {
    return this.groupKey;
  }

  public getNoteKey() {
    return this.noteKey;
  }

  public getOwnerKey() {
    return this.ownerKey;
  }

  public getComments() {
    return this.comments;
  }
}
