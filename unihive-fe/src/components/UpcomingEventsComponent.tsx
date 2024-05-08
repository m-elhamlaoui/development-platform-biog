import { ChevronRightIcon } from "@heroicons/react/24/outline";

function UpcomingEventsComponent() {
  return (
    <div className="container cont4">
      <div className="upcomings-title">Upcoming Events</div>
      <div className="upcomings">
        <div className="see-more-upcomings">
          See More
          <ChevronRightIcon
            style={{
              width: "20px",
              height: "20px",
              strokeWidth: "2.5",
            }}
          />
        </div>
        <div className="up-event-card">
          <div className="up-event-card-date">
            <span className="num">01</span>
            <span className="mon">Mar</span>
          </div>
          <div className="up-event-card-title">
            <span className="title">
              ITHOLIC Version 3.0: The Future of ITOps
            </span>
            <div className="date">
              <span>From 01 March 2024 To 03 March 2024</span>
              <span style={{ fontWeight: 600, fontSize: "1.2rem" }}>
                ENSIAS IT CLUB
              </span>
            </div>
          </div>
          <div className="up-event-card-banner">
            <img src="https://picsum.photos/750/350?random=1" alt="" />
          </div>
        </div>
        <div className="up-event-card">
          <div className="up-event-card-date">
            <span className="num">01</span>
            <span className="mon">Mar</span>
          </div>
          <div className="up-event-card-title">
            <span className="title">
              ITHOLIC Version 3.0: The Future of ITOps
            </span>
            <div className="date">
              <span>From 01 March 2024 To 03 March 2024</span>
              <span style={{ fontWeight: 600, fontSize: "1.2rem" }}>
                ENSIAS IT CLUB
              </span>
            </div>
          </div>
          <div className="up-event-card-banner">
            <img src="https://picsum.photos/750/350?random=1" alt="" />
          </div>
        </div>
        <div className="up-event-card">
          <div className="up-event-card-date">
            <span className="num">01</span>
            <span className="mon">Mar</span>
          </div>
          <div className="up-event-card-title">
            <span className="title">
              ITHOLIC Version 3.0: The Future of ITOps
            </span>
            <div className="date">
              <span>From 01 March 2024 To 03 March 2024</span>
              <span style={{ fontWeight: 600, fontSize: "1.2rem" }}>
                ENSIAS IT CLUB
              </span>
            </div>
          </div>
          <div className="up-event-card-banner">
            <img src="https://picsum.photos/750/350?random=1" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpcomingEventsComponent;
