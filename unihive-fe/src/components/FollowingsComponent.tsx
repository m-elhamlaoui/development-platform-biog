import { useEffect, useState } from "react";
import Club from "../models/Club";
import StudentService from "../services/StudentService";

function FollowingsComponent(props: { studentId: string; clubs: Club[] }) {
  const [clubs, setClubs] = useState<Club[]>(props.clubs);
  const [isDisabled, setIsDisabled] = useState(false);
  const [show, setShow] = useState(true);
  const [selectedClubId, setSelectedClubId] = useState<string>("");

  const token = localStorage.getItem("student");

  const [clubsToShow, setClubsToShow] = useState<Club[]>([]);
  const [clubsPerPage, setClubsPerPage] = useState(
    clubs.length > 3 ? 3 : clubs.length
  );

  function loopWithSlice(start: number, end: number) {
    const slicedClubs = clubs.slice(start, end);
    setClubsToShow(slicedClubs);
  }

  useEffect(() => {
    loopWithSlice(0, clubsPerPage);
    if (clubs.length - clubsPerPage <= 0) {
      setShow(false);
    }
  }, [clubsPerPage]);

  function handleShowMoreClubs() {
    setClubsPerPage((prevClubsPerPage) => prevClubsPerPage + 3);
  }

  const handleUnfollow = (clubId: string) => {
    setIsDisabled(true);
    setSelectedClubId(clubId);
    StudentService.unfollowClub(token, props.studentId, clubId).then(
      (response) => {
        if (response.status === 200) {
          setClubs(clubs.filter((club) => club.id !== clubId));
          setClubsToShow(clubs.filter((club) => club.id !== clubId));
          setIsDisabled(false);
          setSelectedClubId("");
        }
      },
      (error) => {
        console.error(error);
        setIsDisabled(false);
        setSelectedClubId("");
      }
    );
  };
  return (
    <div className="followers">
      <span className="follow-title">Clubs you're following</span>

      <div className="clubs">
        {clubs.length != 0 ? (
          <div>
            {clubsToShow.map((club) => (
              <div className="club-item" key={club.id}>
                <div className="club-logo">
                  <img src={club.clubLogo} alt="club logo" />
                </div>
                <span className="club-title">{club.clubName}</span>
                <button
                  className="btn unfollow-btn"
                  type="button"
                  onClick={() => handleUnfollow(club.id)}
                  disabled={isDisabled && club.id === selectedClubId}
                >
                  Unfollow
                </button>
              </div>
            ))}
            {show && (
              <button
                className="btn save-save"
                style={{
                  justifySelf: "center",
                  alignSelf: "center",
                  marginTop: "0.5rem",
                }}
                type="button"
                onClick={handleShowMoreClubs}
              >
                Show More
              </button>
            )}
          </div>
        ) : (
          <div className="no-followers">You are not following any clubs</div>
        )}
      </div>
    </div>
  );
}

export default FollowingsComponent;
