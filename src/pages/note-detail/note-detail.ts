import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StudyBuddyServiceProvider } from '../../providers/study-buddy-service/study-buddy-service';
import { Note } from '../../models/note-model';
import { HomePage } from '../home/home';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Comment } from '../../models/comment-model';
import { User } from '../../models/user-model';
import { NotesPage } from '../notes/notes';

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
  private newCommentText: string = '';
  private user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private studyBuddyService: StudyBuddyServiceProvider, private camera: Camera) {
    this.user = this.studyBuddyService.getActiveUser();
    this.note = undefined;
    this.groupKey = this.navParams.get("groupKey");
    this.editing = this.navParams.get("editing");
    let noteKey = this.navParams.get("noteKey");
    if (noteKey === undefined) {
      let name = this.navParams.get("noteName");
      let text = [];
      let images = [];
      let key = "";
      let ownerKey = this.user.getUserKey();
      let comments = [];
      this.note = new Note(name, text, images, this.groupKey, key, ownerKey, comments);
      this.textNotesCopy = this.note.getTextNotes();
    } else {
      this.note = this.studyBuddyService.getNoteByKey(noteKey);
      this.textNotesCopy = this.note.getTextNotes();
    }
  }

  @ViewChild(Slides) slides: Slides;

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

  public goHome() {
    this.navCtrl.push(HomePage);
  }

  private takePic() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      if (imageData) {
        let images = this.note.getImageNotes();
        images.push('data:image/jpeg;base64,' + imageData);
        this.note.setImageNotes(images);
      }
    });
  }

  private addComment() {
    if (this.newCommentText != '') {
      let comment = new Comment(this.user.getUserName(), this.user.getUserKey(), this.newCommentText);
      let noteComments = this.note.getComments();
      noteComments.push(comment);
      this.note.setComments(noteComments);
      this.studyBuddyService.updateNote(this.note);
      this.newCommentText = '';
    }
  }

  private goToNotes() {
    this.navCtrl.push(NotesPage, {"groupKey": this.note.getGroupKey()});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoteDetailPage');
  }

}
