import axios from "axios";
const REST_API_URL_EVENTS = "http://localhost:8080/event/events";

export const getEvents = () => axios.get(REST_API_URL_EVENTS);

const EventService = {
  getEvents,
};
export default EventService;
