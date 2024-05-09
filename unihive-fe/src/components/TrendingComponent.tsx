import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Carousel } from "react-bootstrap";
import Event from "../models/Event";
import { Month } from "../models/Month";

function TrendingComponent(props: { events: Event[] }) {
  const events = props.events;
  events.sort((a, b) => (b.eventRating || 0) - (a.eventRating || 0));
  const MonthsArray = Object.values(Month);
  return (
    <Carousel
      controls={false}
      interval={null}
      wrap={true}
      pause={"hover"}
      touch={true}
    >
      {events.map((event) => (
        <Carousel.Item key={event.id}>
          <div className="cont">
            <div className="row">
              <div className="col">
                <div className="desc">
                  <div className="slide-title">
                    {event.eventName.length > 35
                      ? event.eventName.slice(0, 35) + "..."
                      : event.eventName}
                  </div>
                  <div className="slide-date">
                    {(() => {
                      const startDate = new Date(event.startTime ?? new Date());
                      const endDate = new Date(event.endTime ?? new Date());
                      if (
                        startDate.getUTCDate() === endDate.getUTCDate() &&
                        startDate.getUTCMonth() === endDate.getUTCMonth() &&
                        startDate.getUTCFullYear() === endDate.getUTCFullYear()
                      ) {
                        const day = startDate.getUTCDate();
                        let daySuffix;
                        if (day === 1 || day === 21 || day === 31) {
                          daySuffix = "st";
                        } else if (day === 2 || day === 22) {
                          daySuffix = "nd";
                        } else if (day === 3 || day === 23) {
                          daySuffix = "rd";
                        } else {
                          daySuffix = "th";
                        }
                        return (
                          <span>
                            {MonthsArray[startDate.getUTCMonth()]}{" "}
                            {startDate.getUTCDate()}
                            {daySuffix} {startDate.getUTCFullYear()}
                          </span>
                        );
                      }
                      return (
                        <span>
                          From{" "}
                          {startDate.getUTCDate() < 10
                            ? "0" + startDate.getUTCDate()
                            : startDate.getUTCDate()}{" "}
                          {MonthsArray[startDate.getUTCMonth()]}{" "}
                          {startDate.getUTCFullYear()} To{" "}
                          {endDate.getUTCDate() < 10
                            ? "0" + endDate.getUTCDate()
                            : endDate.getUTCDate()}{" "}
                          {MonthsArray[endDate.getUTCMonth()]}{" "}
                          {endDate.getUTCFullYear()}
                        </span>
                      );
                    })()}
                  </div>
                  <div className="slide-text">
                    {event.eventDescription.length > 141
                      ? event.eventDescription.slice(0, 140) + "..."
                      : event.eventDescription}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-5">
                    <button
                      className="btn btn-primary see-event-btn"
                      type="button"
                    >
                      <span style={{ padding: "4px" }}>See Event</span>
                      <ChevronRightIcon
                        style={{
                          width: "20px",
                          height: "20px",
                          strokeWidth: "2.5",
                        }}
                      />
                    </button>
                  </div>
                  <div className="col">
                    <button className="club" type="button">
                      <img
                        width="20%"
                        src={event.club.clubLogo}
                        alt="club logo"
                      />
                      <span>
                        {event.club.clubName.length > 14
                          ? event.club.clubName.slice(0, 12) + "..."
                          : event.club.clubName}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="slide-image">
                  <img src={event.eventBanner} alt="image" />
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default TrendingComponent;
