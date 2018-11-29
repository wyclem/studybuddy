export class Event {
  private eventName: string;
  private eventLocation: string;
  private eventTime: string;
  private eventAttendees: string[];
  private groupKey: string;
  private eventKey: string;

  constructor(name: string, location: string, time: string, attendees: string[], groupKey: string, eventKey: string) {
    this.eventName = name;
    this.eventLocation = location;
    this.eventTime = time;
    this.eventAttendees = attendees;
    this.groupKey = groupKey;
    this.eventKey = eventKey;
  }

  public setName(newName: string) {
    this.eventName = newName;
  }

  public setLocation(newLocation: string) {
    this.eventLocation = newLocation;
  }

  public setTime(newTime: string) {
    this.eventTime = newTime;
  }

  public setAttendees(newAttendees: string[]) {
    this.eventAttendees = newAttendees;
  }

  public getName() {
    return this.eventName;
  }

  public getLocation() {
    return this.eventLocation;
  }

  public getTime() {
    return this.eventTime;
  }

  public getAttendees() {
    return this.eventAttendees;
  }

  public getGroupKey() {
    return this.groupKey;
  }

  public getEventKey() {
    return this.eventKey;
  }
}
