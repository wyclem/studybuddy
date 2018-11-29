import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Note } from '../../models/note-model';
import { StudyBuddyServiceProvider } from '../../providers/study-buddy-service/study-buddy-service';
import { NoteDetailPage } from '../note-detail/note-detail';

/**
 * Generated class for the NotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html',
})
export class NotesPage {
  private notes: Note[];
  private groupKey: string;
  private newNoteName: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private studyBuddyService: StudyBuddyServiceProvider) {
    this.groupKey = this.navParams.get("groupKey");
    this.notes = this.studyBuddyService.getNotesByGroupKey(this.groupKey);
    this.studyBuddyService.getObservable().subscribe(update => {
      // this.notes = this.studyBuddyService.getNotesByGroupKey(this.groupKey);
      this.notes = this.studyBuddyService.getNotesByGroupKey(this.groupKey);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotesPage');
  }

  viewNote(noteKey: string) {
    this.navCtrl.push(NoteDetailPage, {"groupKey": this.groupKey, "noteKey": noteKey});
  }

  addNote() {
    if (this.newNoteName != ""){
      let noteName = this.newNoteName;
      this.newNoteName = "";
      this.navCtrl.push(NoteDetailPage, {"groupKey": this.groupKey, "noteName": noteName});
    }
  }

}
