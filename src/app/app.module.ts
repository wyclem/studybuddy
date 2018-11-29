import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { GroupDetailPage } from '../pages/group-detail/group-detail';
import { EventsPage } from '../pages/events/events';
import { NotesPage } from '../pages/notes/notes';
import { EventDetailPage } from '../pages/event-detail/event-detail';
import { NoteDetailPage } from '../pages/note-detail/note-detail';
import { StudyBuddyServiceProvider } from '../providers/study-buddy-service/study-buddy-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GroupDetailPage,
    EventsPage,
    NotesPage,
    EventDetailPage,
    NoteDetailPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    GroupDetailPage,
    EventsPage,
    NotesPage,
    EventDetailPage,
    NoteDetailPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StudyBuddyServiceProvider
  ]
})
export class AppModule {}
