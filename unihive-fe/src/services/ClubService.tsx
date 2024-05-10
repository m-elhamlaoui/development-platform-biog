import axios from "axios";
const REST_API_URL_CLUBS = "http://localhost:8080/club/clubs";

export const getClubs = () => axios.get(REST_API_URL_CLUBS);

const ClubService = {
  getClubs,
};
export default ClubService;
