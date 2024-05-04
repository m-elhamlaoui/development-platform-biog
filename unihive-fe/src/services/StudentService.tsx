import axios from "axios";
const REST_API_URL_EVENTS="http://localhost:8080/student/events"
const REST_API_URL_CLUB="http://localhost:8080/student/club"
const REST_API_URL_EVENTS_BY_CLUB="http://localhost:8080/student/club"

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
    };
export default StudentService;
  
  