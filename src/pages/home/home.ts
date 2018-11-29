import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StudyBuddyServiceProvider } from '../../providers/study-buddy-service/study-buddy-service';
import { Group } from '../../models/group-model';
import { GroupDetailPage } from '../group-detail/group-detail';
import { LoginPage } from '../login/login';
import { User } from '../../models/user-model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private groups: Group[];
  private newGroupName: string;
  private user: User;

  constructor(public navCtrl: NavController, private studyBuddyService: StudyBuddyServiceProvider) {
    this.user = this.studyBuddyService.getActiveUser();
    this.groups = this.studyBuddyService.getGroups();
    this.studyBuddyService.getObservable().subscribe(update => {
      this.groups = this.studyBuddyService.getGroups();
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
