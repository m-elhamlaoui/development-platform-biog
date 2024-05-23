import Club from "./Club";

interface Event {
  id: string;
  createdAt: Date;
  eventCategory: string;
  eventName: string;
  eventDescription: string;
  eventLocation: string;
  eventBanner: string;
  startTime?: Date;
  endTime?: Date;
  eventRating?: number;
  ratingCount?: number;
  club: Club;
}

export default Event;
