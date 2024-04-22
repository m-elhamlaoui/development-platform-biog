import { ChevronRightIcon } from "@heroicons/react/24/outline";
import logo from "../assets/eitc-logo.png";
import { Carousel } from "react-bootstrap";

function TrendingComponent() {
  return (
    <Carousel
      controls={false}
      interval={null}
      wrap={true}
      pause={"hover"}
      touch={true}
    >
      <Carousel.Item>
        <div className="cont">
          <div className="row">
            <div className="col">
              <div className="desc">
                <div className="slide-title">
                  ITHOLIC Version 3.0: The Future of ITOps
                </div>
                <div className="slide-date">
                  From 01 March 2024 To 03 March 2024
                </div>
                <div className="slide-text">
                  Your reminder to not miss ITHOLIC with its diverse activities
                  ! This is your chance to meet up with like minded people and
                  to hone your skills...
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
                    <img width="20%" src={logo} alt="club logo" />
                    <span>ENSIAS IT CLUB</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="slide-image">
                <img src="https://picsum.photos/750/350?random=1" alt="image" />
              </div>
            </div>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="cont">
          <div className="row">
            <div className="col">
              <div className="desc">
                <div className="slide-title">
                  ITHOLIC Version 3.0: The Future of ITOps
                </div>
                <div className="slide-date">
                  From 01 March 2024 To 03 March 2024
                </div>
                <div className="slide-text">
                  Your reminder to not miss ITHOLIC with its diverse activities
                  ! This is your chance to meet up with like minded people and
                  to hone your skills...
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
                    <img width="20%" src={logo} alt="club logo" />
                    <span>ENSIAS IT CLUB</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="slide-image">
                <img src="https://picsum.photos/750/350?random=1" alt="image" />
              </div>
            </div>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="cont">
          <div className="row">
            <div className="col">
              <div className="desc">
                <div className="slide-title">
                  ITHOLIC Version 3.0: The Future of ITOps
                </div>
                <div className="slide-date">
                  From 01 March 2024 To 03 March 2024
                </div>
                <div className="slide-text">
                  Your reminder to not miss ITHOLIC with its diverse activities
                  ! This is your chance to meet up with like minded people and
                  to hone your skills...
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
                    <img width="20%" src={logo} alt="club logo" />
                    <span>ENSIAS IT CLUB</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="slide-image">
                <img src="https://picsum.photos/750/350?random=1" alt="image" />
              </div>
            </div>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="cont">
          <div className="row">
            <div className="col">
              <div className="desc">
                <div className="slide-title">
                  ITHOLIC Version 3.0: The Future of ITOps
                </div>
                <div className="slide-date">
                  From 01 March 2024 To 03 March 2024
                </div>
                <div className="slide-text">
                  Your reminder to not miss ITHOLIC with its diverse activities
                  ! This is your chance to meet up with like minded people and
                  to hone your skills...
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
                    <img width="20%" src={logo} alt="club logo" />
                    <span>ENSIAS IT CLUB</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="slide-image">
                <img src="https://picsum.photos/750/350?random=1" alt="image" />
              </div>
            </div>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default TrendingComponent;
