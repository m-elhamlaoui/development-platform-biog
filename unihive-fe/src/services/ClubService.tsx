import axios from "axios";
const REST_API_URL_CLUBS =
  "https://unihive-0bcdbacd92b4.herokuapp.com/club/clubs";

export const getClubs = () => axios.get(REST_API_URL_CLUBS);

const ClubService = {
  getClubs,
};
export default ClubService;
