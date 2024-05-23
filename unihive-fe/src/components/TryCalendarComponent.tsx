import { ChevronRightIcon } from "@heroicons/react/24/outline";

function TryCalendarComponent() {
  return (
    <div className="container cont5">
      <div className="calendar-img">
        <div className="try-calendar">
          <span>
            Try Our <br />
            Calendar Manager!
          </span>
          <button className="btn btn-primary try-calendar-btn" type="button">
            <span style={{ padding: "4px" }}>Try</span>
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

export default TryCalendarComponent;
