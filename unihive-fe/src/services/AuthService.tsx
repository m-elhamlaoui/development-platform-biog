import axios from "axios";

const REST_API_URL = "http://localhost:8080/auth/";

function register(data: any) {
  return axios.post(REST_API_URL + "signup", {
    cne: data.cne,
    numApogee: data.numApogee,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
    schoolCard: data.schoolCard,
    schoolName: data.school,
  });
}

function login(email: string, password: string) {
  return axios.post(REST_API_URL + "authenticate", {
    email,
    password,
  });
}

function logout() {
  if (localStorage.getItem("student")) {
    localStorage.removeItem("student");
  } else if (localStorage.getItem("admin")) {
    localStorage.removeItem("admin");
  } else if (localStorage.getItem("superadmin")) {
    localStorage.removeItem("superadmin");
  }
}

function forgottenPassword(email: string) {
  return axios.post(REST_API_URL + "forgotPassword", {
    email,
  });
}

const AuthService = {
  register,
  login,
  logout,
  forgottenPassword,
};

export default AuthService;
