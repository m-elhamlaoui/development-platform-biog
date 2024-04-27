import axios from "axios";

const REST_API_URL = "http://localhost:8080/superadmin/clubs";

export const listClubs = (token: string | null) =>
  axios.get(REST_API_URL, { headers: { Authorization: `Bearer ${token}` } });
