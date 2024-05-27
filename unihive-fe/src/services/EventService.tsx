import axios from "axios";
const REST_API_URL_EVENTS =
  "https://unihive-0bcdbacd92b4.herokuapp.com/event/events";

export const getEvents = () => axios.get(REST_API_URL_EVENTS);

const EventService = {
  getEvents,
};
export default EventService;
