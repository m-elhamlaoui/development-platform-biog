function UpcomingEventsComponent() {
  return (
    <div className="container cont3">
      <div className="upcomings-title">Upcoming Events</div>
      <div className="upcomings">
        <div className="up-event-card">
          <div className="up-event-card-date">
            <div className="num">01</div>
            <div className="mon">Mar</div>
          </div>
          <div className="up-event-card-title">Event Title</div>
          <div className="up-event-card-club">Event Club</div>
          {/* <div className="up-event-card-img"></div> */}
        </div>
        <div className="up-event-card"></div>
        <div className="up-event-card"></div>
      </div>
    </div>
  );
}

export default UpcomingEventsComponent;
