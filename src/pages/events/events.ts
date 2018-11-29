import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StudyBuddyServiceProvider } from '../../providers/study-buddy-service/study-buddy-service';
import { Event } from '../../models/event-model';
import { EventDetailPage } from '../../pages/event-detail/event-detail';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private studyBuddyService: StudyBuddyServiceProvider) {
    this.groupKey = this.navParams.get("groupKey");
    this.events = this.studyBuddyService.getEventsByGroupKey(this.groupKey);
    this.studyBuddyService.getObservable().subscribe(update => {
      this.events = this.studyBuddyService.getEventsByGroupKey(this.groupKey);
    });
  }

  public viewEvent(event: Event) {
    this.navCtrl.push(EventDetailPage, {"groupKey": this.groupKey, "eventKey": event.getEventKey()});
  }

  public addEvent() {
    if (this.newEventName != '') {
      let eventName = this.newEventName;
      this.newEventName = '';
      this.navCtrl.push(EventDetailPage, {"groupKey": this.groupKey, "eventName": eventName});
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
  }

}
