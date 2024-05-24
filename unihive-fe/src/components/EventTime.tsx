import { Month } from "../models/Month";
interface EventTimeProps {
    startTime?: Date;
    endTime?: Date;
  }
  

const EventTime: React.FC<EventTimeProps> = (props) => {
    const { startTime, endTime } = props;
    const MonthsArray = Object.values(Month);



    return ( <>
    <div style={{marginTop:"20px" }}>
    <div style={{fontSize:"22px",fontWeight: "bold"}}>
    Date & Hour
    </div>
    <div className="slide-date">
                    {(() => {
                      const startDate = new Date(startTime ?? new Date());
                      const endDate = new Date(endTime ?? new Date());
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
    </div>

    </> );
}

export default EventTime;