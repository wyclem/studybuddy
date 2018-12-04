import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Group } from '../../models/group-model';
import { Note } from '../../models/note-model';
import { Event } from '../../models/event-model';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { User } from '../../models/user-model';

import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyA1faRhDfQ8ei91TxGOiPVdyv3C3X07Pa8",
    authDomain: "studybuddy-e393f.firebaseapp.com",
    databaseURL: "https://studybuddy-e393f.firebaseio.com",
    projectId: "studybuddy-e393f",
    storageBucket: "studybuddy-e393f.appspot.com",
    messagingSenderId: "825351389851"
  };

/*
  Generated class for the StudyBuddyServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StudyBuddyServiceProvider {

  private db: any;
  private serviceObserver: Observer<Object>;
  private clientObservable: Observable<Object>;
  private groups: Group[];
  private notes: Note[];
  private events: Event[];
  private activeUser: User;

  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.db = firebase.database();
    this.clientObservable = Observable.create(observerThatWasCreated => {
      this.serviceObserver = observerThatWasCreated;
    });
    let groupDataRef = this.db.ref('/Groups');
    groupDataRef.on('value', snapshot => {
      this.groups = [];
      snapshot.forEach(childSnapshot => {
        let name = childSnapshot.val().name;
        let groupKey = childSnapshot.key;
        let members = childSnapshot.val().members;
        if (members === undefined) {
          members = [];
        }
        let group = new Group(name, groupKey, members);
        this.groups.push(group);
      });
      this.notifySubscribers();
    });
    let notesDataRef = this.db.ref('/Notes');
    notesDataRef.on('value', snapshot => {
      this.notes = [];
      snapshot.forEach(childSnapshot => {
        let name = childSnapshot.val().name;
        let textNotesRaw = childSnapshot.val().textNotes;
        let textNotesList = [];
        if (textNotesRaw != undefined) {
          for (let textNote in textNotesRaw) {
            textNotesList.push(textNotesRaw[textNote]);
          }
        }
        let imageNotesRaw = childSnapshot.val().imageNotes;
        let imageNotesList =[];
        if (imageNotesRaw != undefined) {
          for (let imageNote in imageNotesRaw) {
            imageNotesList.push(imageNotesRaw[imageNote]);
          }
        }
        let groupKey = childSnapshot.val().groupKey;
        let noteKey = childSnapshot.key;
        let ownerKey = childSnapshot.val().ownerKey;
        let note = new Note(name, textNotesList, imageNotesList, groupKey, noteKey, ownerKey);
        this.notes.push(note);
      });
      console.log(this.notes);
      this.notifySubscribers();
    });
    let eventsDataRef = this.db.ref('/Events');
    eventsDataRef.on('value', snapshot => {
      this.events = [];
      snapshot.forEach(childSnapshot => {
        let name = childSnapshot.val().name;
        let location = childSnapshot.val().location;
        let time = childSnapshot.val().time;
        let attendees = childSnapshot.val().attendees;
        let groupKey = childSnapshot.val().groupKey;
        let eventKey = childSnapshot.key;
        let ownerKey = childSnapshot.val().ownerKey;
        let event = new Event(name, location, time, attendees, groupKey, eventKey, ownerKey);
        this.events.push(event);
      });
      this.notifySubscribers();
    });
  }

  public getGroups() {
    let groupsClone = [];
    for (let g of this.groups) {
      let groupClone = JSON.parse(JSON.stringify(g));
      groupsClone.push(new Group(groupClone['groupName'], groupClone['groupKey'], groupClone['members']));
    }
    return groupsClone;
  }

  public getGroupsForUser() {
    let groupsClone = [];
    for (let g of this.groups) {
      for (let member of g.getMembers()) {
        if (this.activeUser.getUserKey() === member) {
          let groupClone = JSON.parse(JSON.stringify(g));
          groupsClone.push(new Group(groupClone['groupName'], groupClone['groupKey'], groupClone['members']));
        }
      }
    }
    return groupsClone;
  }

  private notifySubscribers() {
    this.serviceObserver.next(undefined);
  }

  public getObservable() {
    return this.clientObservable;
  }

  public addGroup(group: Group) {
    let listRef = this.db.ref('/Groups');
    let entryRef = listRef.push();
    let dataRecord = {
      name: group.getName(),
      members: group.getMembers()
    };
    entryRef.set(dataRecord);
    this.notifySubscribers();
  }

  public updateGroup(group: Group) {
    let groupsRef = this.db.ref('/Groups');
    let childRef = groupsRef.child(group.getKey());
    let dataRecord = {
      name: group.getName(),
      members: group.getMembers()
    }
    childRef.set(dataRecord);
    this.notifySubscribers();
  }

  public getGroupByKey(groupKey: string) {
    for (let group of this.groups) {
      if (group.getKey() === groupKey) {
        let groupClone = JSON.parse(JSON.stringify(group));
        let groupObjectClone = new Group(groupClone['groupName'], groupClone['groupKey'], groupClone['members']);
        return groupObjectClone;
      }
    }
  }

  // public getNotes() {
  //   return this.notes;
  // }

  public getNotesByGroupKey(groupKey: string) {
    let groupNotes = [];
    for (let note of this.notes) {
      if (note.getGroupKey() === groupKey) {
        let noteClone = JSON.parse(JSON.stringify(note));
        groupNotes.push(new Note(noteClone['noteName'], noteClone['textNotes'], noteClone['imageNotes'], noteClone['groupKey'], noteClone['noteKey'], noteClone['ownerKey']));
      }
    }
    return groupNotes;
  }

  public getNoteByKey(noteKey: string) {
    for (let note of this.notes) {
      if (note.getNoteKey() === noteKey) {
        let noteClone = JSON.parse(JSON.stringify(note));
        let noteObjectClone = new Note(noteClone['noteName'], noteClone['textNotes'], noteClone['imageNotes'], noteClone['groupKey'], noteClone['noteKey'], noteClone['ownerKey']);
        return noteObjectClone;
      }
    }
  }

  public getNotesForUser() {
    let notesClone = [];
    for (let note of this.notes) {
      if (this.activeUser.getUserKey() === note.getOwnerKey()) {
        let noteClone = JSON.parse(JSON.stringify(note));
        notesClone.push(new Note(noteClone['noteName'], noteClone['textNotes'], noteClone['imageNotes'], noteClone['groupKey'], noteClone['noteKey'], noteClone['ownerKey']));
      }
    }
    return notesClone;
  }

  public addNote(note: Note) {
    let listRef = this.db.ref('/Notes');
    let noteRef = listRef.push();
    let dataRecord = {
      name: note.getName(),
      textNotes: note.getTextNotes(),
      imageNotes: note.getImageNotes(),
      groupKey: note.getGroupKey(),
      ownerKey: note.getOwnerKey()
    }
    noteRef.set(dataRecord);
    this.notifySubscribers();
  }

  public updateNote(note: Note) {
    let parentRef = this.db.ref('/Notes');
    let childRef = parentRef.child(note.getNoteKey());
    let dataRecord = {
      name: note.getName(),
      textNotes: note.getTextNotes(),
      imageNotes: note.getImageNotes(),
      groupKey: note.getGroupKey(),
      ownerKey: note.getOwnerKey()
    }
    childRef.set(dataRecord);
    this.notifySubscribers();
  }

  public removeNote(noteKey: string) {
    let parentRef = this.db.ref('/Notes');
    let childRef = parentRef.child(noteKey);
    childRef.remove();
    this.notifySubscribers();
  }

  public getEventsByGroupKey(groupKey: string) {
    let groupEvents = [];
    for (let event of this.events) {
      if (event.getGroupKey() === groupKey) {
        let eventClone = JSON.parse(JSON.stringify(event));
        groupEvents.push(new Event(eventClone['eventName'], eventClone['eventLocation'], eventClone['eventTime'], eventClone['eventAttendees'], eventClone['groupKey'], eventClone['eventKey'], eventClone['ownerKey']));
      }
    }
    return groupEvents;
  }

  public getEventByKey(eventKey: string) {
    for (let event of this.events) {
      if (event.getEventKey() === eventKey) {
        let eventClone = JSON.parse(JSON.stringify(event));
        let eventObjectClone = new Event(eventClone['eventName'], eventClone['eventLocation'], eventClone['eventTime'], eventClone['eventAttendees'], eventClone['groupKey'], eventClone['eventKey'], eventClone['ownerKey']);
        return eventObjectClone;
      }
    }
  }

  public getEventsForUser() {
    let eventsClone = [];
    for (let event of this.events) {
      for (let attendee of event.getAttendees()) {
        if (this.activeUser.getUserName() === attendee) {
          let eventClone = JSON.parse(JSON.stringify(event));
          eventsClone.push(new Event(eventClone['eventName'], eventClone['eventLocation'], eventClone['eventTime'], eventClone['eventAttendees'], eventClone['groupKey'], eventClone['eventKey'], eventClone['ownerKey']));
        }
      }
    }
    return eventsClone;
  }

  public addEvent(event: Event) {
    let eventsRef = this.db.ref("/Events");
    let childRef = eventsRef.push();
    let dataRecord = {
      name: event.getName(),
      location: event.getLocation(),
      time: event.getTime(),
      attendees: event.getAttendees(),
      groupKey: event.getGroupKey(),
      ownerKey: event.getOwnerKey()
    }
    childRef.set(dataRecord);
    this.notifySubscribers();
  }

  public updateEvent(event: Event) {
    let eventsRef = this.db.ref("/Events");
    let childRef = eventsRef.child(event.getEventKey());
    let dataRecord = {
      name: event.getName(),
      location: event.getLocation(),
      time: event.getTime(),
      attendees: event.getAttendees(),
      groupKey: event.getGroupKey(),
      ownerKey: event.getOwnerKey()
    }
    childRef.set(dataRecord);
    this.notifySubscribers();
  }

  public removeEvent(event: Event) {
    let parentRef = this.db.ref("/Events");
    let childRef = parentRef.child(event.getEventKey());
    childRef.remove();
    this.notifySubscribers();
  }

  public createUser(userName: string, password: string) {
    let userNameExists = this.checkUserNameExists(userName);
    return userNameExists.then(result => {
      if (!result) {
        let usersRef = this.db.ref("/Users");
        let childRef = usersRef.push();
        let dataRecord = {
          userName: userName,
          password: password
        }
        childRef.set(dataRecord);
        return true;
      } else {
        return false;
      }
    });
  }

  private checkUserNameExists(userName: string) {
    let usersRef = this.db.ref("/Users");
    return usersRef.once('value').then(snapshot => {
      let exists = false;
      snapshot.forEach(childSnapshot => {
        if (childSnapshot.val().userName === userName) {
          exists = true;
        }
      });
      return exists;
    });

  }

  public setActiveUser(userName: string, password: string) {
    let usersRef = this.db.ref("/Users");
    this.activeUser = undefined;
    return usersRef.once('value').then(snapshot => {
      snapshot.forEach(childSnapshot => {
        if (childSnapshot.val().userName === userName && childSnapshot.val().password === password) {
          this.activeUser = new User(childSnapshot.val().userName, childSnapshot.key);
        }
      });
    });
  }

  public getActiveUser() {
    return this.activeUser;
  }

  public logout() {
    this.activeUser = undefined;
  }

}
