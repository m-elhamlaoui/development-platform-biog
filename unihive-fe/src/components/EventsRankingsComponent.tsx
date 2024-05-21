import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Table } from "react-bootstrap";
import Rating from "./RatingComponent";
import Event from "../models/Event";
import { Month } from "../models/Month";

function EventsRankingsComponent(props: { events: Event[] }) {
  const events = props.events;
  events.sort((a, b) => (b.eventRating || 0) - (a.eventRating || 0));
  const MonthsArray = Object.values(Month);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-7 rankings">
          <div className="rankings-title events">Top 3 Events</div>
          <div className="tb">
            <Table borderless>
              <tbody>
                {events.slice(0, 3).map((event, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {event.eventName.length > 48
                        ? event.eventName.slice(0, 45) + "..."
                        : event.eventName}
                    </td>
                    <td>
                      <div className="rating">
                        <Rating value={event.eventRating || 0} max={5} />
                        {event.eventRating?.toFixed(1) || 0}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="col-md-4 rankings-btn">
          <button className="btn btn-primary see-rankings-btn" type="button">
            <span style={{ padding: "4px" }}>See Rankings</span>
            <ChevronRightIcon
              style={{
                width: "26px",
                height: "26px",
                strokeWidth: "2.5",
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventsRankingsComponent;
