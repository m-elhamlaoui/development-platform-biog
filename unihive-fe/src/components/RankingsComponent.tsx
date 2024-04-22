import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Table } from "react-bootstrap";
import eitcLogo from "../assets/eitc-logo.png";
import cjeLogo from "../assets/cje-logo.png";
import eaicLogo from "../assets/eaic-logo.png";
import Rating from "./RatingComponent";

function RankingsComponent() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-7 rankings">
          <div className="rankings-title">Top 3 Clubs</div>
          <div className="tb">
            <Table borderless>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>
                    <img src={eitcLogo} width={60} alt="EITC" />
                    ENSIAS IT CLUB
                  </td>
                  <td>
                    <div className="rating">
                      <Rating value={5.0} max={5} />
                      5.0
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>
                    <img src={cjeLogo} width={60} alt="CJE" />
                    Club Japonais ENSIAS
                  </td>
                  <td>
                    <div className="rating">
                      <Rating value={4.5} max={5} />
                      4.5
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>
                    <img
                      src={eaicLogo}
                      width={60}
                      style={{
                        marginRight: "2.5rem",
                      }}
                      alt="EAIC"
                    />
                    ENSIAS AI CLUB
                  </td>
                  <td>
                    <div className="rating">
                      <Rating value={4.0} max={5} />
                      4.0
                    </div>
                  </td>
                </tr>
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

export default RankingsComponent;
