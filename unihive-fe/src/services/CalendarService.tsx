import axios from "axios";

const REST_API_URL = "http://localhost:8080/calendar/";

function getCalendar(token: string | null, id: string | null) {
  return axios.get(REST_API_URL + "get/" + id, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

function getEvents(token: string | null, id: string | null) {
  return axios.get(REST_API_URL + "events/" + id, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

function addEvent(token: string | null, id: string | null, data: any) {
  return axios.post(REST_API_URL + "addevent/" + id, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

function updateDescription(
  token: string | null,
  id: string | null,
  eventId: string | null,
  description: string
) {
  return axios.put(REST_API_URL + "updescription/" + id + "/" + eventId, null, {
    params: { description: description },
    headers: { Authorization: `Bearer ${token}` },
  });
}

function deleteEvent(
  token: string | null,
  id: string | null,
  eventId: string | null
) {
  return axios.delete(REST_API_URL + "delevent/" + id + "/" + eventId, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

function logout(token: string | null, id: string | null) {
  return axios.delete(REST_API_URL + "revoke/" + id, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

const CalendarService = {
  getCalendar,
  getEvents,
  addEvent,
  updateDescription,
  deleteEvent,
  logout,
};

export default CalendarService;
