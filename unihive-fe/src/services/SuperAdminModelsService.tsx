import axios from "axios";

// GET_APIS
const REST_API_URL_CLUBS_GET =
  "https://unihive-0bcdbacd92b4.herokuapp.com/superadmin/clubs";
const REST_API_URL_ADMINS_GET =
  "https://unihive-0bcdbacd92b4.herokuapp.com/superadmin/admins";
const REST_API_URL_EVENTS_GET =
  "https://unihive-0bcdbacd92b4.herokuapp.com/superadmin/events";
const REST_API_URL_SCHOOLS_GET =
  "https://unihive-0bcdbacd92b4.herokuapp.com/superadmin/schools";
const REST_API_URL_STUDENTS_GET =
  "https://unihive-0bcdbacd92b4.herokuapp.com/superadmin/students";
const REST_API_URL_REQUESTS_GET =
  "https://unihive-0bcdbacd92b4.herokuapp.com/superadmin/requests";
const REST_API_URL_CLUB_GET =
  "https://unihive-0bcdbacd92b4.herokuapp.com/superadmin/club";
const REST_API_URL_ADMIN_GET =
  "https://unihive-0bcdbacd92b4.herokuapp.com/superadmin/admin";
const REST_API_URL_EVENT_GET =
  "https://unihive-0bcdbacd92b4.herokuapp.com/superadmin/event";
const REST_API_URL_SCHOOL_GET =
  "https://unihive-0bcdbacd92b4.herokuapp.com/superadmin/school";
const REST_API_URL_STUDENT_GET =
  "https://unihive-0bcdbacd92b4.herokuapp.com/superadmin/student";
const REST_API_URL_REQUEST_GET =
  "https://unihive-0bcdbacd92b4.herokuapp.com/superadmin/request";
const REST_API_URL_ALLCOUNTS_GET =
  "https://unihive-0bcdbacd92b4.herokuapp.com/superadmin/allcounts";
const REST_API_URL_ALL_GET =
  "https://unihive-0bcdbacd92b4.herokuapp.com/superadmin/all";

// POST_APIS
const REST_API_URL_CLUB_POST =
  "https://unihive-0bcdbacd92b4.herokuapp.com/auth/register/club";
const REST_API_URL_ADMIN_POST =
  "https://unihive-0bcdbacd92b4.herokuapp.com/auth/register/admin";
const REST_API_URL_EVENT_POST =
  "https://unihive-0bcdbacd92b4.herokuapp.com/superadmin/addevent";
const REST_API_URL_SCHOOL_POST =
  "https://unihive-0bcdbacd92b4.herokuapp.com/superadmin/addschool";
const REST_API_URL_STUDENT_POST =
  "https://unihive-0bcdbacd92b4.herokuapp.com/auth/register/student";
const REST_API_URL_REQUEST_POST =
  "https://unihive-0bcdbacd92b4.herokuapp.com/superadmin/addrequest";

// PUT_APIS
const REST_API_URL_CLUB_PUT =
  "https://unihive-0bcdbacd92b4.herokuapp.com/superadmin/upclub/";
const REST_API_URL_ADMIN_PUT =
  "https://unihive-0bcdbacd92b4.herokuapp.com/superadmin/upadmin/";
const REST_API_URL_EVENT_PUT =
  "https://unihive-0bcdbacd92b4.herokuapp.com/superadmin/upevent/";
const REST_API_URL_SCHOOL_PUT =
  "https://unihive-0bcdbacd92b4.herokuapp.com/superadmin/upschool/";
const REST_API_URL_STUDENT_PUT =
  "https://unihive-0bcdbacd92b4.herokuapp.com/superadmin/upstudent/";
const REST_API_URL_REQUEST_PUT =
  "https://unihive-0bcdbacd92b4.herokuapp.com/superadmin/uprequest/";
const REST_API_URL_SA_PUT =
  "https://unihive-0bcdbacd92b4.herokuapp.com/superadmin/upemail";
const REST_API_URL_SAPASS_PUT =
  "https://unihive-0bcdbacd92b4.herokuapp.com/superadmin/uppassword";

// DELETE_APIS
const REST_API_URL_CLUB_DELETE =
  "https://unihive-0bcdbacd92b4.herokuapp.com/superadmin/delclub/";
const REST_API_URL_ADMIN_DELETE =
  "https://unihive-0bcdbacd92b4.herokuapp.com/superadmin/deladmin/";
const REST_API_URL_EVENT_DELETE =
  "https://unihive-0bcdbacd92b4.herokuapp.com/superadmin/delevent/";
const REST_API_URL_SCHOOL_DELETE =
  "https://unihive-0bcdbacd92b4.herokuapp.com/superadmin/delschool/";
const REST_API_URL_STUDENT_DELETE =
  "https://unihive-0bcdbacd92b4.herokuapp.com/superadmin/delstudent/";
const REST_API_URL_REQUEST_DELETE =
  "https://unihive-0bcdbacd92b4.herokuapp.com/superadmin/delrequest/";

const REST_API_URL_FILE_UPLOAD =
  "https://unihive-0bcdbacd92b4.herokuapp.com/upload";

// ACCEPT_REQUEST
const REST_API_URL_REQUEST_ACCEPT =
  "https://unihive-0bcdbacd92b4.herokuapp.com/auth/acceptrequest/";

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

const updateClub = (token: string | null, id: string | null, data: any) =>
  axios.put(REST_API_URL_CLUB_PUT + id, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

const updateAdmin = (token: string | null, id: string | null, data: any) =>
  axios.put(REST_API_URL_ADMIN_PUT + id, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

const updateEvent = (token: string | null, id: string | null, data: any) =>
  axios.put(REST_API_URL_EVENT_PUT + id, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

const updateSchool = (token: string | null, id: string | null, data: any) =>
  axios.put(REST_API_URL_SCHOOL_PUT + id, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

const updateStudent = (token: string | null, id: string | null, data: any) =>
  axios.put(REST_API_URL_STUDENT_PUT + id, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

const updateRequest = (token: string | null, id: string | null, data: any) =>
  axios.put(REST_API_URL_REQUEST_PUT + id, data, {
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

const acceptRequest = (token: string | null, id: string | null) =>
  axios.put(REST_API_URL_REQUEST_ACCEPT + id, null, {
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

const getAllCounts = (token: string | null) =>
  axios.get(REST_API_URL_ALLCOUNTS_GET, {
    headers: { Authorization: `Bearer ${token}` },
  });

const getAll = (token: string | null) =>
  axios.get(REST_API_URL_ALL_GET, {
    headers: { Authorization: `Bearer ${token}` },
  });

const updateSuperAdminEmail = (token: string | null, email: string) =>
  axios.put(REST_API_URL_SA_PUT, null, {
    params: { email: email },
    headers: { Authorization: `Bearer ${token}` },
  });

const updateSuperAdminPassword = (token: string, data: any) =>
  axios.put(REST_API_URL_SAPASS_PUT, data, {
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
  acceptRequest,
  uploadFile,
  getAllCounts,
  getAll,
  updateSuperAdminEmail,
  updateSuperAdminPassword,
};

export default ModelsService;
