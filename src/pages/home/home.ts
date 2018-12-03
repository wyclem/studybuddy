import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StudyBuddyServiceProvider } from '../../providers/study-buddy-service/study-buddy-service';
import { Group } from '../../models/group-model';
import { GroupDetailPage } from '../group-detail/group-detail';
import { LoginPage } from '../login/login';
import { User } from '../../models/user-model';
import { Event } from '../../models/event-model';
import { Note } from '../../models/note-model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private groups: Group[];
  private newGroupName: string;
  private user: User;
  private events: Event[];
  private notes: Note[];

  constructor(public navCtrl: NavController, private studyBuddyService: StudyBuddyServiceProvider) {
    this.user = this.studyBuddyService.getActiveUser();
    this.groups = this.studyBuddyService.getGroupsForUser();
    this.events = this.studyBuddyService.getEventsForUser();
    this.notes = this.studyBuddyService.getNotesForUser();
    this.studyBuddyService.getObservable().subscribe(update => {
      this.groups = this.studyBuddyService.getGroupsForUser();
      this.events = this.studyBuddyService.getEventsForUser();
      this.notes = this.studyBuddyService.getNotesForUser();
    });
  }

  private addGroup() {
    if (this.newGroupName != '') {
      this.studyBuddyService.addGroup(this.newGroupName);
      this.newGroupName ='';
    }
  }

  public visitGroup(groupKey: string) {
    this.navCtrl.push(GroupDetailPage, {"groupKey": groupKey});
  }

}
