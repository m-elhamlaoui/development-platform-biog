import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Event from "../models/Event";
import { Month } from "../models/Month";

function UpcomingEventsComponent(props: { events: Event[] }) {
  const events = props.events;
  events.sort(
    (a, b) =>
      new Date(a.startTime ?? new Date()).getTime() -
      new Date(b.startTime ?? new Date()).getTime()
  );
  const MonthsArray = Object.values(Month);
  return (
    <div className="container cont4">
      <div className="upcomings-title">Upcoming Events</div>
      <div className="upcomings">
        <div className="see-more-upcomings">
          <span>
            See More
            <ChevronRightIcon
              style={{
                width: "20px",
                height: "20px",
                strokeWidth: "2.5",
              }}
            />
          </span>
        </div>
        {events.slice(0, 3).map((event) => (
          <div className="up-event-card" key={event.id}>
            <div className="up-event-card-date">
              <span className="num">
                {new Date(event.startTime ?? new Date())
                  .getDate()
                  .toString()
                  .padStart(2, "0")}
              </span>
              <span className="mon">
                {new Date(event.startTime ?? new Date()).toLocaleString(
                  "default",
                  { month: "short" }
                )}
              </span>
            </div>
            <div className="up-event-card-title">
              <span className="title">
                {event.eventName.length > 48
                  ? event.eventName.slice(0, 45) + "..."
                  : event.eventName}
              </span>
              <div className="date">
                <span>
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
                        {startDate.getUTCDate().toString().padStart(2, "0")}{" "}
                        {MonthsArray[startDate.getUTCMonth()]}{" "}
                        {startDate.getUTCFullYear()} To{" "}
                        {endDate.getUTCDate().toString().padStart(2, "0")}{" "}
                        {MonthsArray[endDate.getUTCMonth()]}{" "}
                        {endDate.getUTCFullYear()}
                      </span>
                    );
                  })()}
                </span>
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: "1.2rem",
                    cursor: "pointer",
                  }}
                >
                  {event.club.clubName}
                </span>
              </div>
            </div>
            <div className="up-event-card-banner">
              <img src={event.eventBanner} alt="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpcomingEventsComponent;
