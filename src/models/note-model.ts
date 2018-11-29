export class Note {

  private noteName: string;
  private textNotes: string[];
  private imageNotes: string[];
  private groupKey: string;
  private noteKey: string;

  constructor(name: string, text: string[], images: string[], groupKey: string, noteKey: string) {
    this.noteName = name;
    this.textNotes = text;
    this.imageNotes = images;
    this.groupKey = groupKey;
    this.noteKey = noteKey;
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
}
