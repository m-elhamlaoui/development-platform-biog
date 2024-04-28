import axios from "axios";

const REST_API_URL_CLUBS = "http://localhost:8080/superadmin/clubs";
const REST_API_URL_ADMINS = "http://localhost:8080/superadmin/admins";
const REST_API_URL_EVENTS = "http://localhost:8080/superadmin/events";
const REST_API_URL_SCHOOLS = "http://localhost:8080/superadmin/schools";
const REST_API_URL_STUDENTS = "http://localhost:8080/superadmin/students";

const listClubs = (token: string | null) =>
  axios.get(REST_API_URL_CLUBS, {
    headers: { Authorization: `Bearer ${token}` },
  });

const listAdmins = (token: string | null) =>
  axios.get(REST_API_URL_ADMINS, {
    headers: { Authorization: `Bearer ${token}` },
  });

const listEvents = (token: string | null) =>
  axios.get(REST_API_URL_EVENTS, {
    headers: { Authorization: `Bearer ${token}` },
  });

const listSchools = (token: string | null) =>
  axios.get(REST_API_URL_SCHOOLS, {
    headers: { Authorization: `Bearer ${token}` },
  });

const listStudents = (token: string | null) =>
  axios.get(REST_API_URL_STUDENTS, {
    headers: { Authorization: `Bearer ${token}` },
  });

const ModelsService = {
  listClubs,
  listAdmins,
  listEvents,
  listSchools,
  listStudents,
};

export default ModelsService;
