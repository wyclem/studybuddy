import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Event } from '../../models/event-model';
import { StudyBuddyServiceProvider } from '../../providers/study-buddy-service/study-buddy-service';
import { User } from '../../models/user-model';

/**
 * Generated class for the EventDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {
  private groupKey: string;
  private event: Event;
  private newEventLocation: string = '';
  private newEventMonth: string = '';
  private newEventDay: string = '';
  private newEventHour: string = '';
  private newEventMinutes: string = '';
  private newEventMeridiem: string = '';
  private editing: boolean;
  private user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private studyBuddyService: StudyBuddyServiceProvider) {
    this.user = this.studyBuddyService.getActiveUser();
    this.groupKey = this.navParams.get("groupKey");
    this.editing = this.navParams.get("editing");
    let eventKey = this.navParams.get("eventKey");
    if (eventKey === undefined) {
      let eventName = this.navParams.get("eventName");
      let eventLocation = "";
      let eventTime = "";
      let eventAttendees = [this.user.getUserName()];
      let newEventKey = '';
      let ownerKey = this.user.getUserKey();
      this.event = new Event(eventName, eventLocation, eventTime, eventAttendees, this.groupKey, newEventKey, ownerKey);
    } else {
      this.event = this.studyBuddyService.getEventByKey(eventKey);
      this.newEventLocation = this.event.getLocation();
      let timeString = this.event.getTime();
      timeString = timeString.replace(",", "");
      timeString = timeString.replace(":", " ");
      let timeArray = timeString.split(" ");
      this.newEventMonth = timeArray[0];
      this.newEventDay = timeArray[1];
      this.newEventHour = timeArray[2];
      this.newEventMinutes = timeArray[3];
      this.newEventMeridiem = timeArray[4];
    }
  }

  public saveEvent() {
    this.event.setLocation(this.newEventLocation);
    let eventTime = this.newEventMonth + " " + this.newEventDay + ", " + this.newEventHour + ":" + this.newEventMinutes + " " + this.newEventMeridiem;
    this.event.setTime(eventTime);
    this.newEventLocation = "";
    this.newEventMonth = "";
    this.newEventDay = "";
    this.newEventHour = "";
    this.newEventMinutes = "";
    this.newEventMeridiem = "";
    if (this.event.getEventKey() === "") {
      this.studyBuddyService.addEvent(this.event);
    } else {
      this.studyBuddyService.updateEvent(this.event);
    }
    this.navCtrl.pop();
  }

  public joinEvent() {
    let attendees = this.event.getAttendees();
    attendees.push(this.user.getUserName());
    this.event.setAttendees(attendees);
    this.studyBuddyService.updateEvent(this.event);
  }

  public leaveEvent() {
    let attendees = this.event.getAttendees();
    let indexToRemove: number;
    for (let attendee in attendees) {
      if (attendees[attendee] === this.user.getUserName()) {
        indexToRemove = parseInt(attendee);
      }
    }
    attendees.splice(indexToRemove, 1);
    this.event.setAttendees(attendees);
    this.studyBuddyService.updateEvent(this.event);
  }

  public userAttending() {
    let attendees = this.event.getAttendees();
    for (let attendee of attendees) {
      if (attendee === this.user.getUserName()) {
        return true;
      }
    }
    return false;
  }

  public cancelEvent() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDetailPage');
  }

}
