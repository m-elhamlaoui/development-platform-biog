import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Table } from "react-bootstrap";
import Rating from "./RatingComponent";
import Club from "../models/Club";

function ClubsRankingsComponent(props: { clubs: Club[] }) {
  const clubs = props.clubs;
  clubs.sort((a, b) => b.clubRating - a.clubRating);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-7 rankings">
          <div className="rankings-title">Top 3 Clubs</div>
          <div className="tb">
            <Table borderless>
              <tbody>
                {clubs.slice(0, 3).map((club, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <img src={club.clubLogo} width={60} alt={club.clubName} />
                      {club.clubName}
                    </td>
                    <td>
                      <div className="rating">
                        <Rating value={club.clubRating} max={5} />
                        {club.clubRating.toFixed(1)}
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

export default ClubsRankingsComponent;
