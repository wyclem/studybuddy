import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StudyBuddyServiceProvider } from '../../providers/study-buddy-service/study-buddy-service';
import { HomePage } from '../home/home';
import { User } from '../../models/user-model';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private password: string;
  private userName: string;
  private user: User;
  private validUser: boolean = true;
  private userExists: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private studyBuddyService: StudyBuddyServiceProvider) {
    this.studyBuddyService.getObservable().subscribe();
  }

  public createUser() {
    this.studyBuddyService.createUser(this.userName, this.password).then(result => {
      if (result) {
        this.studyBuddyService.setActiveUser(this.userName, this.password).then(() => {
          this.user = this.studyBuddyService.getActiveUser();
          this.password = '';
          this.userName = '';
          this.navCtrl.push(HomePage);
        });
      } else {
        this.userExists = true;
      }
    });

    // if (this.studyBuddyService.createUser(this.userName, this.password)) {
    //   this.user = this.studyBuddyService.getActiveUser();
    //   this.navCtrl.push(HomePage);
    // } else {
    //   this.userExists = true;
    // }

  }

  public login() {
    this.studyBuddyService.setActiveUser(this.userName, this.password).then(() => {
      if (this.studyBuddyService.getActiveUser() != undefined) {
        this.userName = '';
        this.password = '';
        this.navCtrl.push(HomePage);
      } else {
        this.validUser = false;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
