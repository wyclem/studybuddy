import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StudyBuddyServiceProvider } from '../../providers/study-buddy-service/study-buddy-service';
import { Group } from '../../models/group-model';
import { GroupDetailPage } from '../group-detail/group-detail';
import { LoginPage } from '../login/login';
import { User } from '../../models/user-model';
import { Event } from '../../models/event-model';
import { Note } from '../../models/note-model';
import { EventDetailPage } from '../event-detail/event-detail';
import { NoteDetailPage } from '../note-detail/note-detail';
import { BrowseGroupsPage } from '../browse-groups/browse-groups'

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

  public visitGroup(groupKey: string) {
    this.navCtrl.push(GroupDetailPage, {"groupKey": groupKey});
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

  public viewEvent(event: Event) {
    this.navCtrl.push(EventDetailPage, {"groupKey": event.getGroupKey(), "eventKey": event.getEventKey(), "editing": false});
  }

  public editEvent(event: Event) {
    this.navCtrl.push(EventDetailPage, {"groupKey": event.getGroupKey(), "eventKey": event.getEventKey(), "editing": true});
  }

  public removeEvent(event: Event) {
    this.studyBuddyService.removeEvent(event);
  }

  public viewNote(note: Note) {
    this.navCtrl.push(NoteDetailPage, {"groupKey": note.getGroupKey(), "noteKey": note.getNoteKey(), "editing": false});
  }

  public editNote(note: Note) {
    this.navCtrl.push(NoteDetailPage, {"groupKey": note.getGroupKey(), "noteKey": note.getNoteKey(), "editing": true});
  }

  public removeNote(note: Note) {
    this.studyBuddyService.removeNote(note.getNoteKey());
  }

  public browseGroups() {
    this.navCtrl.push(BrowseGroupsPage);
  }

}
