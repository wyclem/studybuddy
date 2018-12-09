import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Note } from '../../models/note-model';
import { StudyBuddyServiceProvider } from '../../providers/study-buddy-service/study-buddy-service';
import { NoteDetailPage } from '../note-detail/note-detail';
import { User } from '../../models/user-model';
import { HomePage } from '../home/home';
import { GroupDetailPage } from '../group-detail/group-detail';

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
  private user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private studyBuddyService: StudyBuddyServiceProvider) {
    this.groupKey = this.navParams.get("groupKey");
    this.notes = this.studyBuddyService.getNotesByGroupKey(this.groupKey);
    this.user = this.studyBuddyService.getActiveUser();
    console.log(this.user.getUserKey());
    this.studyBuddyService.getObservable().subscribe(update => {
      // this.notes = this.studyBuddyService.getNotesByGroupKey(this.groupKey);
      this.notes = this.studyBuddyService.getNotesByGroupKey(this.groupKey);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotesPage');
  }

  viewNote(noteKey: string) {
    this.navCtrl.push(NoteDetailPage, {"groupKey": this.groupKey, "noteKey": noteKey, "editing": false});
  }

  addNote() {
    if (this.newNoteName != ""){
      let noteName = this.newNoteName;
      this.newNoteName = "";
      this.navCtrl.push(NoteDetailPage, {"groupKey": this.groupKey, "noteName": noteName, "editing": true});
    }
  }

  editNote(noteKey: string) {
    this.navCtrl.push(NoteDetailPage, {"groupKey": this.groupKey, "noteKey": noteKey, "editing": true});
  }

  removeNote(noteKey: string) {
    this.studyBuddyService.removeNote(noteKey);
  }

  public goToGroup() {
    this.navCtrl.push(GroupDetailPage, {"groupKey": this.groupKey});
  }

  public goHome() {
    this.navCtrl.push(HomePage);
  }

}
