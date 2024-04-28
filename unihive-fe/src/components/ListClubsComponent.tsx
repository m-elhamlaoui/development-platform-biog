import { useEffect, useState } from "react";
import ModelService from "../services/ModelsService";
import { Table } from "react-bootstrap";
import Club from "../models/Club";
import { isExpired } from "react-jwt";
import { useNavigate } from "react-router-dom";

function ListClubsComponent() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const token = localStorage.getItem("user") as string;
  const isMyTokenExpired = isExpired(token);
  const navigate = useNavigate();

  useEffect(() => {
    if (isMyTokenExpired) {
      localStorage.removeItem("user");
      navigate("/login");
    }
    ModelService.listClubs(token)
      .then((response) => {
        setClubs(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const clubsArray = Object.values(clubs);

  return (
    <div className="cont2">
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Club Name</th>
            <th>Club Logo</th>
            <th>Club Description</th>
            <th>Club Banner</th>
            <th>Club Rating</th>
            <th>Rating Count</th>
            <th>School</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody>
          {clubsArray.map((club) => (
            <tr key={club.id}>
              <td>{club.id.slice(0, 10)}...</td>
              <td>
                {club.clubName.length > 10
                  ? club.clubName.slice(0, 10) + "..."
                  : club.clubName}
              </td>
              <td>
                {club.clubLogo.length > 10
                  ? club.clubLogo.slice(0, 10) + "..."
                  : club.clubLogo}
              </td>
              <td>
                {club.clubDescription.length > 10
                  ? club.clubDescription.slice(0, 10) + "..."
                  : club.clubDescription}
              </td>
              <td>
                {club.clubBanner.length > 10
                  ? club.clubBanner.slice(0, 10) + "..."
                  : club.clubBanner}
              </td>
              <td>{club.clubRating}</td>
              <td>{club.ratingCount}</td>
              <td>{club.school.schoolName}</td>
              <td>{club.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ListClubsComponent;
