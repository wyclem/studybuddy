import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Group } from '../../models/group-model';
import { User } from '../../models/user-model';
import { StudyBuddyServiceProvider } from '../../providers/study-buddy-service/study-buddy-service';
import { GroupDetailPage } from '../group-detail/group-detail';
import { HomePage } from '../home/home';

/**
 * Generated class for the BrowseGroupsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-browse-groups',
  templateUrl: 'browse-groups.html',
})
export class BrowseGroupsPage {
  private groups: Group[];
  private userGroups: Group[];
  private user: User;
  private newGroupName: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private studyBuddyService: StudyBuddyServiceProvider) {
    this.groups = this.studyBuddyService.getGroups();
    this.user = this.studyBuddyService.getActiveUser();
    this.studyBuddyService.getObservable().subscribe(() => {
      this.groups = this.studyBuddyService.getGroups();
    });
  }

  private addGroup() {
    if (this.newGroupName != '') {
      let group = new Group(this.newGroupName, "", [this.user.getUserKey()]);
      this.studyBuddyService.addGroup(group);
      this.newGroupName ='';
    }
  }

  public userIsMember(group: Group) {
    for (let member of group.getMembers()) {
      if (this.user.getUserKey() === member) {
        return true;
      }
    }
    return false;
  }

  public joinGroup(group: Group) {
    let groupMembers = group.getMembers();
    groupMembers.push(this.user.getUserKey());
    group.setMembers(groupMembers);
    this.studyBuddyService.updateGroup(group);
  }

  public leaveGroup(group: Group) {
    let groupMembers = group.getMembers();
    let indexToRemove: number;
    for (let member in groupMembers) {
      if (groupMembers[member] === this.user.getUserKey()){
        indexToRemove = parseInt(member);
      }
    }
    groupMembers.splice(indexToRemove, 1);
    group.setMembers(groupMembers);
    this.studyBuddyService.updateGroup(group);
  }

  public viewGroup(group: Group) {
    this.navCtrl.push(GroupDetailPage, {"groupKey": group.getKey()});
  }

  public goHome() {
    this.navCtrl.push(HomePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BrowseGroupsPage');
  }

}
