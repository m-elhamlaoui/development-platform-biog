import { useState } from "react";
import Club from "../models/Club";
import StudentService from "../services/StudentService";

function FollowingsComponent(props: { studentId: string; clubs: Club[] }) {
  const [clubs, setClubs] = useState<Club[]>(props.clubs);
  const [isDisabled, setIsDisabled] = useState(false);
  const [selectedClubId, setSelectedClubId] = useState<string>("");

  const token = localStorage.getItem("student");

  const handleUnfollow = (clubId: string) => {
    setIsDisabled(true);
    setSelectedClubId(clubId);
    StudentService.unfollowClub(token, props.studentId, clubId).then(
      (response) => {
        if (response.status === 200) {
          setClubs(clubs.filter((club) => club.id !== clubId));
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
        {clubs.map((club) => (
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
      </div>
    </div>
  );
}

export default FollowingsComponent;
