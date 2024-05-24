import axios from "axios";

// GET_APIS
const REST_API_URL_CLUBS_GET = "http://localhost:8080/admin/clubs/";
const REST_API_URL_EVENTS_GET = "http://localhost:8080/admin/events/";
const REST_API_URL_STUDENTS_GET = "http://localhost:8080/admin/students/";
const REST_API_URL_REQUESTS_GET = "http://localhost:8080/admin/requests/";
const REST_API_URL_CLUB_GET = "http://localhost:8080/admin/club/";
const REST_API_URL_EVENT_GET = "http://localhost:8080/admin/event/";
const REST_API_URL_STUDENT_GET = "http://localhost:8080/admin/student/";
const REST_API_URL_REQUEST_GET = "http://localhost:8080/admin/request/";
const REST_API_URL_ALLCOUNTS_GET = "http://localhost:8080/admin/allcounts/";
const REST_API_URL_ALL_GET = "http://localhost:8080/admin/";

// POST_APIS
const REST_API_URL_CLUB_POST = "http://localhost:8080/auth/register/club/";
const REST_API_URL_EVENT_POST = "http://localhost:8080/admin/addevent/";
const REST_API_URL_STUDENT_POST =
  "http://localhost:8080/auth/register/student/";
const REST_API_URL_REQUEST_POST = "http://localhost:8080/admin/addrequest/";

// PUT_APIS
const REST_API_URL_CLUB_PUT = "http://localhost:8080/admin/upclub/";
const REST_API_URL_EVENT_PUT = "http://localhost:8080/admin/upevent/";
const REST_API_URL_STUDENT_PUT = "http://localhost:8080/admin/upstudent/";
const REST_API_URL_REQUEST_PUT = "http://localhost:8080/admin/uprequest/";
const REST_API_URL_SA_PUT = "http://localhost:8080/admin/upemail/";
const REST_API_URL_SAPASS_PUT = "http://localhost:8080/admin/uppassword";

// DELETE_APIS
const REST_API_URL_CLUB_DELETE = "http://localhost:8080/admin/delclub/";
const REST_API_URL_EVENT_DELETE = "http://localhost:8080/admin/delevent/";
const REST_API_URL_STUDENT_DELETE = "http://localhost:8080/admin/delstudent/";
const REST_API_URL_REQUEST_DELETE = "http://localhost:8080/admin/delrequest/";

const REST_API_URL_FILE_UPLOAD = "http://localhost:8080/upload";

// ACCEPT_REQUEST
const REST_API_URL_REQUEST_ACCEPT = "http://localhost:8080/auth/acceptrequest/";

const listClubs = (token: string | null, schoolId: string) =>
  axios.get(REST_API_URL_CLUBS_GET + schoolId, {
    headers: { Authorization: `Bearer ${token}` },
  });

const listEvents = (token: string | null, schoolId: string) =>
  axios.get(REST_API_URL_EVENTS_GET + schoolId, {
    headers: { Authorization: `Bearer ${token}` },
  });

const listStudents = (token: string | null, schoolId: string) =>
  axios.get(REST_API_URL_STUDENTS_GET + schoolId, {
    headers: { Authorization: `Bearer ${token}` },
  });

const listRequests = (token: string | null, schoolId: string) =>
  axios.get(REST_API_URL_REQUESTS_GET + schoolId, {
    headers: { Authorization: `Bearer ${token}` },
  });

const Club = (token: string | null, id: string | null, schoolId: string) =>
  axios.get(REST_API_URL_CLUB_GET + schoolId + "/" + id, {
    headers: { Authorization: `Bearer ${token}` },
  });

const Event = (token: string | null, id: string | null, schoolId: string) =>
  axios.get(REST_API_URL_EVENT_GET + schoolId + "/" + id, {
    headers: { Authorization: `Bearer ${token}` },
  });

const Student = (token: string | null, id: string | null, schoolId: string) =>
  axios.get(REST_API_URL_STUDENT_GET + schoolId + "/" + id, {
    headers: { Authorization: `Bearer ${token}` },
  });

const Request = (token: string | null, id: string | null, schoolId: string) =>
  axios.get(REST_API_URL_REQUEST_GET + schoolId + "/" + id, {
    headers: { Authorization: `Bearer ${token}` },
  });

const addClub = (token: string | null, data: any, schoolId: string) =>
  axios.post(REST_API_URL_CLUB_POST + schoolId, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

const addEvent = (token: string | null, data: any, schoolId: string) =>
  axios.post(REST_API_URL_EVENT_POST + schoolId, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

const addStudent = (token: string | null, data: any, schoolId: string) =>
  axios.post(REST_API_URL_STUDENT_POST + schoolId, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

const updateClub = (
  token: string | null,
  id: string | null,
  data: any,
  schoolId: string
) =>
  axios.put(REST_API_URL_CLUB_PUT + schoolId + "/" + id, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

const updateEvent = (
  token: string | null,
  id: string | null,
  data: any,
  schoolId: string
) =>
  axios.put(REST_API_URL_EVENT_PUT + schoolId + "/" + id, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

const updateStudent = (
  token: string | null,
  id: string | null,
  data: any,
  schoolId: string
) =>
  axios.put(REST_API_URL_STUDENT_PUT + schoolId + "/" + id, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

const updateRequest = (
  token: string | null,
  id: string | null,
  data: any,
  schoolId: string
) =>
  axios.put(REST_API_URL_REQUEST_PUT + schoolId + "/" + id, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

const deleteClub = (
  token: string | null,
  id: string | null,
  schoolId: string
) =>
  axios.delete(REST_API_URL_CLUB_DELETE + schoolId + "/" + id, {
    headers: { Authorization: `Bearer ${token}` },
  });

const deleteEvent = (
  token: string | null,
  id: string | null,
  schoolId: string
) =>
  axios.delete(REST_API_URL_EVENT_DELETE + schoolId + "/" + id, {
    headers: { Authorization: `Bearer ${token}` },
  });

const deleteStudent = (
  token: string | null,
  id: string | null,
  schoolId: string
) =>
  axios.delete(REST_API_URL_STUDENT_DELETE + schoolId + "/" + id, {
    headers: { Authorization: `Bearer ${token}` },
  });

const deleteRequest = (
  token: string | null,
  id: string | null,
  schoolId: string
) =>
  axios.delete(REST_API_URL_REQUEST_DELETE + schoolId + "/" + id, {
    headers: { Authorization: `Bearer ${token}` },
  });

const acceptRequest = (
  token: string | null,
  id: string | null,
  schoolId: string
) =>
  axios.put(REST_API_URL_REQUEST_ACCEPT + schoolId + "/" + id, null, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

const uploadFile = (file: any) =>
  axios.post(REST_API_URL_FILE_UPLOAD, file, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

const getAllCounts = (token: string | null, schoolId: string) =>
  axios.get(REST_API_URL_ALLCOUNTS_GET + schoolId, {
    headers: { Authorization: `Bearer ${token}` },
  });

const getAdmin = (token: string | null, email: string) =>
  axios.get(REST_API_URL_ALL_GET + email, {
    headers: { Authorization: `Bearer ${token}` },
  });

const updateAdminEmail = (
  token: string | null,
  id: string | null,
  email: string
) =>
  axios.put(REST_API_URL_SA_PUT + id, null, {
    params: { email: email },
    headers: { Authorization: `Bearer ${token}` },
  });

const updateAdminPassword = (token: string, data: any) =>
  axios.put(REST_API_URL_SAPASS_PUT, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

const School = (token: string | null, email: string | null) =>
  axios.get(REST_API_URL_ALL_GET + "school/" + email, {
    headers: { Authorization: `Bearer ${token}` },
  });

const ModelsService = {
  listClubs,
  listEvents,
  listStudents,
  listRequests,
  Club,
  Event,
  Student,
  Request,
  addClub,
  addEvent,
  addStudent,
  updateClub,
  updateEvent,
  updateStudent,
  updateRequest,
  deleteClub,
  deleteEvent,
  deleteStudent,
  deleteRequest,
  acceptRequest,
  uploadFile,
  getAllCounts,
  getAdmin,
  updateAdminEmail,
  updateAdminPassword,
  School,
};

export default ModelsService;
