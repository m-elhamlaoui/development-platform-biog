import axios from "axios";

// GET_APIS
const REST_API_URL_CLUBS_GET = "http://localhost:8080/superadmin/clubs";
const REST_API_URL_ADMINS_GET = "http://localhost:8080/superadmin/admins";
const REST_API_URL_EVENTS_GET = "http://localhost:8080/superadmin/events";
const REST_API_URL_SCHOOLS_GET = "http://localhost:8080/superadmin/schools";
const REST_API_URL_STUDENTS_GET = "http://localhost:8080/superadmin/students";
const REST_API_URL_REQUESTS_GET = "http://localhost:8080/superadmin/requests";
const REST_API_URL_CLUB_GET = "http://localhost:8080/superadmin/club";
const REST_API_URL_ADMIN_GET = "http://localhost:8080/superadmin/admin";
const REST_API_URL_EVENT_GET = "http://localhost:8080/superadmin/event";
const REST_API_URL_SCHOOL_GET = "http://localhost:8080/superadmin/school";
const REST_API_URL_STUDENT_GET = "http://localhost:8080/superadmin/student";
const REST_API_URL_REQUEST_GET = "http://localhost:8080/superadmin/request";

// POST_APIS
const REST_API_URL_CLUB_POST = "http://localhost:8080/auth/register/club";
const REST_API_URL_ADMIN_POST = "http://localhost:8080/auth/register/admin";
const REST_API_URL_EVENT_POST = "http://localhost:8080/superadmin/addevent";
const REST_API_URL_SCHOOL_POST = "http://localhost:8080/superadmin/addschool";
const REST_API_URL_STUDENT_POST = "http://localhost:8080/auth/register/student";
const REST_API_URL_REQUEST_POST = "http://localhost:8080/superadmin/addrequest";

// PUT_APIS
const REST_API_URL_CLUB_PUT = "http://localhost:8080/superadmin/upclub";
const REST_API_URL_ADMIN_PUT = "http://localhost:8080/superadmin/upadmin";
const REST_API_URL_EVENT_PUT = "http://localhost:8080/superadmin/upevent";
const REST_API_URL_SCHOOL_PUT = "http://localhost:8080/superadmin/upschool";
const REST_API_URL_STUDENT_PUT = "http://localhost:8080/superadmin/upstudent";
const REST_API_URL_REQUEST_PUT = "http://localhost:8080/superadmin/uprequest";

// DELETE_APIS
const REST_API_URL_CLUB_DELETE = "http://localhost:8080/superadmin/delclub";
const REST_API_URL_ADMIN_DELETE = "http://localhost:8080/superadmin/deladmin";
const REST_API_URL_EVENT_DELETE = "http://localhost:8080/superadmin/delevent";
const REST_API_URL_SCHOOL_DELETE = "http://localhost:8080/superadmin/delschool";
const REST_API_URL_STUDENT_DELETE =
  "http://localhost:8080/superadmin/delstudent";
const REST_API_URL_REQUEST_DELETE =
  "http://localhost:8080/superadmin/delrequest";

const listClubs = (token: string | null) =>
  axios.get(REST_API_URL_CLUBS_GET, {
    headers: { Authorization: `Bearer ${token}` },
  });

const listAdmins = (token: string | null) =>
  axios.get(REST_API_URL_ADMINS_GET, {
    headers: { Authorization: `Bearer ${token}` },
  });

const listEvents = (token: string | null) =>
  axios.get(REST_API_URL_EVENTS_GET, {
    headers: { Authorization: `Bearer ${token}` },
  });

const listSchools = (token: string | null) =>
  axios.get(REST_API_URL_SCHOOLS_GET, {
    headers: { Authorization: `Bearer ${token}` },
  });

const listStudents = (token: string | null) =>
  axios.get(REST_API_URL_STUDENTS_GET, {
    headers: { Authorization: `Bearer ${token}` },
  });

const listRequests = (token: string | null) =>
  axios.get(REST_API_URL_REQUESTS_GET, {
    headers: { Authorization: `Bearer ${token}` },
  });

const Club = (token: string | null, id: string | null) =>
  axios.get(REST_API_URL_CLUB_GET + id, {
    headers: { Authorization: `Bearer ${token}` },
  });

const Admin = (token: string | null, id: string | null) =>
  axios.get(REST_API_URL_ADMIN_GET + id, {
    headers: { Authorization: `Bearer ${token}` },
  });

const Event = (token: string | null, id: string | null) =>
  axios.get(REST_API_URL_EVENT_GET + id, {
    headers: { Authorization: `Bearer ${token}` },
  });

const School = (token: string | null, id: string | null) =>
  axios.get(REST_API_URL_SCHOOL_GET + id, {
    headers: { Authorization: `Bearer ${token}` },
  });

const Student = (token: string | null, id: string | null) =>
  axios.get(REST_API_URL_STUDENT_GET + id, {
    headers: { Authorization: `Bearer ${token}` },
  });

const Request = (token: string | null, id: string | null) =>
  axios.get(REST_API_URL_REQUEST_GET + id, {
    headers: { Authorization: `Bearer ${token}` },
  });

const addClub = (token: string | null, data: any) =>
  axios.post(REST_API_URL_CLUB_POST, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

const addAdmin = (token: string | null, data: any) =>
  axios.post(REST_API_URL_ADMIN_POST, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

const addEvent = (token: string | null, data: any) =>
  axios.post(REST_API_URL_EVENT_POST, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

const addSchool = (token: string | null, data: any) =>
  axios.post(REST_API_URL_SCHOOL_POST, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

const addStudent = (token: string | null, data: any) =>
  axios.post(REST_API_URL_STUDENT_POST, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

const addRequest = (token: string | null, data: any) =>
  axios.post(REST_API_URL_REQUEST_POST, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

const updateClub = (token: string | null, data: any) =>
  axios.put(REST_API_URL_CLUB_PUT, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

const updateAdmin = (token: string | null, data: any) =>
  axios.put(REST_API_URL_ADMIN_PUT, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

const updateEvent = (token: string | null, data: any) =>
  axios.put(REST_API_URL_EVENT_PUT, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

const updateSchool = (token: string | null, data: any) =>
  axios.put(REST_API_URL_SCHOOL_PUT, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

const updateStudent = (token: string | null, data: any) =>
  axios.put(REST_API_URL_STUDENT_PUT, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

const updateRequest = (token: string | null, data: any) =>
  axios.put(REST_API_URL_REQUEST_PUT, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

const deleteClub = (token: string | null, id: string | null) =>
  axios.delete(REST_API_URL_CLUB_DELETE + id, {
    headers: { Authorization: `Bearer ${token}` },
  });

const deleteAdmin = (token: string | null, id: string | null) =>
  axios.delete(REST_API_URL_ADMIN_DELETE + id, {
    headers: { Authorization: `Bearer ${token}` },
  });

const deleteEvent = (token: string | null, id: string | null) =>
  axios.delete(REST_API_URL_EVENT_DELETE + id, {
    headers: { Authorization: `Bearer ${token}` },
  });

const deleteSchool = (token: string | null, id: string | null) =>
  axios.delete(REST_API_URL_SCHOOL_DELETE + id, {
    headers: { Authorization: `Bearer ${token}` },
  });

const deleteStudent = (token: string | null, id: string | null) =>
  axios.delete(REST_API_URL_STUDENT_DELETE + id, {
    headers: { Authorization: `Bearer ${token}` },
  });

const deleteRequest = (token: string | null, id: string | null) =>
  axios.delete(REST_API_URL_REQUEST_DELETE + id, {
    headers: { Authorization: `Bearer ${token}` },
  });

const ModelsService = {
  listClubs,
  listAdmins,
  listEvents,
  listSchools,
  listStudents,
  listRequests,
  Club,
  Admin,
  Event,
  School,
  Student,
  Request,
  addClub,
  addAdmin,
  addEvent,
  addSchool,
  addStudent,
  addRequest,
  updateClub,
  updateAdmin,
  updateEvent,
  updateSchool,
  updateStudent,
  updateRequest,
  deleteClub,
  deleteAdmin,
  deleteEvent,
  deleteSchool,
  deleteStudent,
  deleteRequest,
};

export default ModelsService;
