import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Event } from '../../models/event-model';
import { StudyBuddyServiceProvider } from '../../providers/study-buddy-service/study-buddy-service';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private studyBuddyService: StudyBuddyServiceProvider) {
    this.groupKey = this.navParams.get("groupKey");
    let eventKey = this.navParams.get("eventKey");
    if (eventKey === undefined) {
      let eventName = this.navParams.get("eventName");
      let eventLocation = "";
      let eventTime = "";
      let eventAttendees = [];
      let newEventKey = '';
      this.event = new Event(eventName, eventLocation, eventTime, eventAttendees, this.groupKey, newEventKey);
    } else {
      this.event = this.studyBuddyService.getEventByKey(eventKey);
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

  public cancelEvent() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDetailPage');
  }

}
