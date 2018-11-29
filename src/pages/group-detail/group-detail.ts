import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventsPage } from '../events/events';
import { NotesPage } from '../notes/notes';
import { StudyBuddyServiceProvider } from '../../providers/study-buddy-service/study-buddy-service';
import { Group } from '../../models/group-model';

/**
 * Generated class for the GroupDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-group-detail',
  templateUrl: 'group-detail.html',
})
export class GroupDetailPage {
  private groupKey: string;
  private group: Group;

  constructor(public navCtrl: NavController, public navParams: NavParams, private studyBuddyService: StudyBuddyServiceProvider) {
    this.groupKey = this.navParams.get("groupKey");
    this.group = this.studyBuddyService.getGroupByKey(this.groupKey);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupDetailPage');
  }

  public viewNotes() {
    this.navCtrl.push(NotesPage, {"groupKey": this.groupKey});
  }

  public viewEvents() {
    this.navCtrl.push(EventsPage, {"groupKey": this.groupKey});
  }

}
