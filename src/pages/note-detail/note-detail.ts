import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StudyBuddyServiceProvider } from '../../providers/study-buddy-service/study-buddy-service';
import { Note } from '../../models/note-model';

/**
 * Generated class for the NoteDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-note-detail',
  templateUrl: 'note-detail.html',
})
export class NoteDetailPage {
  private groupKey: string;
  private note: Note;
  private newTextNote: string ='';
  private editing: boolean;
  private textNotesCopy: string[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private studyBuddyService: StudyBuddyServiceProvider) {
    this.note = undefined;
    this.groupKey = this.navParams.get("groupKey");
    this.editing = this.navParams.get("editing");
    let noteKey = this.navParams.get("noteKey");
    if (noteKey === undefined) {
      let name = this.navParams.get("noteName");
      let text = [];
      let images = [];
      let key = "";
      let ownerKey = this.studyBuddyService.getActiveUser().getUserKey();
      this.note = new Note(name, text, images, this.groupKey, key, ownerKey);
      this.textNotesCopy = this.note.getTextNotes();
    } else {
      this.note = this.studyBuddyService.getNoteByKey(noteKey);
      this.textNotesCopy = this.note.getTextNotes();
    }
  }

  addNewTextNote() {
    if (this.newTextNote != "") {
      this.textNotesCopy.push(this.newTextNote);
      this.newTextNote = '';
    }
  }

  removeNote(index: number) {
    this.textNotesCopy.splice(index, 1);
  }

  saveNote() {
    this.note.setTextNotes(this.textNotesCopy);
    if (this.note.getNoteKey() === "") {
      this.studyBuddyService.addNote(this.note);
    } else {
      this.studyBuddyService.updateNote(this.note);
    }
    this.navCtrl.pop();
  }

  cancelNote() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoteDetailPage');
  }

}
