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

  constructor(public navCtrl: NavController, public navParams: NavParams, private studyBuddyService: StudyBuddyServiceProvider) {
    this.groupKey = this.navParams.get("groupKey");
    let noteKey = this.navParams.get("noteKey");
    if (noteKey === undefined) {
      let name = this.navParams.get("noteName");
      let text = [];
      let images = [];
      let key = "";
      this.note = new Note(name, text, images, this.groupKey, key);
    } else {
      this.note = this.studyBuddyService.getNoteByKey(noteKey);
    }
  }

  addNewTextNote() {
    if (this.newTextNote != "") {
      let textNotes = this.note.getTextNotes();
      textNotes.push(this.newTextNote);
      this.note.setTextNotes(textNotes);
      this.newTextNote = '';
    }
  }

  saveNote() {
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
