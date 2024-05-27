import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

function TryCalendarComponent(props: { isLogged: boolean }) {
  const navigate = useNavigate();
  return (
    <div className="container cont5">
      <div className="calendar-img">
        <div className="try-calendar">
          <span>
            Try Our <br />
            Calendar Manager!
          </span>
          <button
            className="btn btn-primary try-calendar-btn"
            type="button"
            onClick={() => {
              props.isLogged ? navigate("/calendar") : navigate("/login");
            }}
          >
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
