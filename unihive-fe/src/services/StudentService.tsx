import axios from "axios";
const REST_API_URL_EVENTS = "http://localhost:8080/student/events";
const REST_API_URL_CLUB = "http://localhost:8080/student/club";
const REST_API_URL_STUDENT_GET = "http://localhost:8080/student/email/";
const REST_API_URL_STUDENT_UPDATE = "http://localhost:8080/student/";
const REST_API_URL_STUDENT_CLUBS = "http://localhost:8080/student/clubs/";

export const getStudent = (token: string | null, id: string) =>
  axios.get(REST_API_URL_STUDENT_GET + id, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateStudentEmail = (
  token: string | null,
  id: string,
  data: string
) =>
  axios.put(REST_API_URL_STUDENT_UPDATE + "upemail/" + id, null, {
    params: { email: data },
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateStudentProfileImage = (
  token: string | null,
  id: string,
  data: string
) =>
  axios.put(REST_API_URL_STUDENT_UPDATE + "upprofileimage/" + id, null, {
    params: { profileImage: data },
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateStudentPassword = (token: string | null, data: any) =>
  axios.put(REST_API_URL_STUDENT_UPDATE + "uppassword", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteStudent = (token: string | null, id: string) =>
  axios.delete(REST_API_URL_STUDENT_UPDATE + "delete/" + id, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const unfollowClub = (
  token: string | null,
  id: string,
  clubId: string
) =>
  axios.delete(REST_API_URL_STUDENT_UPDATE + "unfollow/" + id + "/" + clubId, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getClubs = (token: string | null, id: string) =>
  axios.get(REST_API_URL_STUDENT_CLUBS + id, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getEvents = (token: string | null) =>
  axios.get(REST_API_URL_EVENTS, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getClub = (token: string | null, id: string) =>
  axios.get(`${REST_API_URL_CLUB}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getEventsByClub = (token: string | null, id: string) =>
  axios.get(`${REST_API_URL_CLUB}/${id}/events`, {
    headers: { Authorization: `Bearer ${token}` },
  });

const StudentService = {
  getEvents,
  getClub,
  getEventsByClub,
  getStudent,
  updateStudentEmail,
  updateStudentProfileImage,
  getClubs,
  updateStudentPassword,
  deleteStudent,
  unfollowClub,
};
export default StudentService;
