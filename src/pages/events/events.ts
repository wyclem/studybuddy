import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StudyBuddyServiceProvider } from '../../providers/study-buddy-service/study-buddy-service';
import { Event } from '../../models/event-model';
import { EventDetailPage } from '../../pages/event-detail/event-detail';
import { User } from '../../models/user-model';
import { HomePage } from '../home/home';

/**
 * Generated class for the EventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
  private groupKey: string;
  private events: Event[];
  private newEventName: string = '';
  private user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private studyBuddyService: StudyBuddyServiceProvider) {
    this.user = this.studyBuddyService.getActiveUser();
    console.log(this.user.getUserKey());
    this.groupKey = this.navParams.get("groupKey");
    this.events = this.studyBuddyService.getEventsByGroupKey(this.groupKey);
    console.log(this.events);
    this.studyBuddyService.getObservable().subscribe(update => {
      this.events = this.studyBuddyService.getEventsByGroupKey(this.groupKey);
    });
  }

  public viewEvent(event: Event) {
    this.navCtrl.push(EventDetailPage, {"groupKey": this.groupKey, "eventKey": event.getEventKey(), "editing": false});
  }

  public addEvent() {
    if (this.newEventName != '') {
      let eventName = this.newEventName;
      this.newEventName = '';
      this.navCtrl.push(EventDetailPage, {"groupKey": this.groupKey, "eventName": eventName, "editing": true});
    }
  }

  public editEvent(event: Event) {
    this.navCtrl.push(EventDetailPage, {"groupKey": this.groupKey, "eventKey": event.getEventKey(), "editing": true})
  }

  public removeEvent(event: Event) {
    this.studyBuddyService.removeEvent(event);
  }

  public goHome() {
    this.navCtrl.push(HomePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
  }

}
