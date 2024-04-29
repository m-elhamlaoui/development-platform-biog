import axios from "axios";
const REST_API_URL_EVENTS="http://localhost:8080/student/events"

export const getEvents = (token: string | null) =>
    axios.get(REST_API_URL_EVENTS, {
      headers: { Authorization: `Bearer ${token}` },
    });

const EventService = {
      getEvents
    };
export default EventService;
  
  