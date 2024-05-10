import axios from "axios";
const REST_API_URL_EVENTS = "http://localhost:8080/student/events";
const REST_API_URL_CLUB = "http://localhost:8080/student/club";
const REST_API_URL_STUDENT_GET = "http://localhost:8080/student/email/";
const REST_API_URL_STUDENT_UPDATE = "http://localhost:8080/student/upstudent/";

export const getStudent = (token: string | null, id: string) =>
  axios.get(REST_API_URL_STUDENT_GET + id, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateStudentEmail = (
  token: string | null,
  id: string,
  email: string
) =>
  axios.put(REST_API_URL_STUDENT_UPDATE + id + "/email/" + email, null, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateStudentProfileImage = (
  token: string | null,
  id: string,
  profileImage: string
) =>
  axios.put(
    REST_API_URL_STUDENT_UPDATE + id + "/profileimage/" + profileImage,
    null,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

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
};
export default StudentService;
