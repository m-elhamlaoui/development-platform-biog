import axios from "axios";

// GET_APIS
const REST_API_URL_CLUBS_GET =
  "https://unihive-0bcdbacd92b4.herokuapp.com/admin/clubs/";
const REST_API_URL_EVENTS_GET =
  "https://unihive-0bcdbacd92b4.herokuapp.com/admin/events/";
const REST_API_URL_STUDENTS_GET =
  "https://unihive-0bcdbacd92b4.herokuapp.com/admin/students/";
const REST_API_URL_REQUESTS_GET =
  "https://unihive-0bcdbacd92b4.herokuapp.com/admin/requests/";
const REST_API_URL_CLUB_GET =
  "https://unihive-0bcdbacd92b4.herokuapp.com/admin/club/";
const REST_API_URL_EVENT_GET =
  "https://unihive-0bcdbacd92b4.herokuapp.com/admin/event/";
const REST_API_URL_STUDENT_GET =
  "https://unihive-0bcdbacd92b4.herokuapp.com/admin/student/";
const REST_API_URL_REQUEST_GET =
  "https://unihive-0bcdbacd92b4.herokuapp.com/admin/request/";
const REST_API_URL_ALLCOUNTS_GET =
  "https://unihive-0bcdbacd92b4.herokuapp.com/admin/allcounts/";
const REST_API_URL_ALL_GET =
  "https://unihive-0bcdbacd92b4.herokuapp.com/admin/";

// POST_APIS
const REST_API_URL_CLUB_POST =
  "https://unihive-0bcdbacd92b4.herokuapp.com/auth/register/club/";
const REST_API_URL_EVENT_POST =
  "https://unihive-0bcdbacd92b4.herokuapp.com/admin/addevent/";
const REST_API_URL_STUDENT_POST =
  "https://unihive-0bcdbacd92b4.herokuapp.com/auth/register/student/";
const REST_API_URL_REQUEST_POST =
  "https://unihive-0bcdbacd92b4.herokuapp.com/admin/addrequest/";

// PUT_APIS
const REST_API_URL_CLUB_PUT =
  "https://unihive-0bcdbacd92b4.herokuapp.com/admin/upclub/";
const REST_API_URL_EVENT_PUT =
  "https://unihive-0bcdbacd92b4.herokuapp.com/admin/upevent/";
const REST_API_URL_STUDENT_PUT =
  "https://unihive-0bcdbacd92b4.herokuapp.com/admin/upstudent/";
const REST_API_URL_REQUEST_PUT =
  "https://unihive-0bcdbacd92b4.herokuapp.com/admin/uprequest/";
const REST_API_URL_SA_PUT =
  "https://unihive-0bcdbacd92b4.herokuapp.com/admin/upemail/";
const REST_API_URL_SAPASS_PUT =
  "https://unihive-0bcdbacd92b4.herokuapp.com/admin/uppassword";

// DELETE_APIS
const REST_API_URL_CLUB_DELETE =
  "https://unihive-0bcdbacd92b4.herokuapp.com/admin/delclub/";
const REST_API_URL_EVENT_DELETE =
  "https://unihive-0bcdbacd92b4.herokuapp.com/admin/delevent/";
const REST_API_URL_STUDENT_DELETE =
  "https://unihive-0bcdbacd92b4.herokuapp.com/admin/delstudent/";
const REST_API_URL_REQUEST_DELETE =
  "https://unihive-0bcdbacd92b4.herokuapp.com/admin/delrequest/";

const REST_API_URL_FILE_UPLOAD =
  "https://unihive-0bcdbacd92b4.herokuapp.com/upload";

// ACCEPT_REQUEST
const REST_API_URL_REQUEST_ACCEPT =
  "https://unihive-0bcdbacd92b4.herokuapp.com/auth/acceptrequest/";

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
