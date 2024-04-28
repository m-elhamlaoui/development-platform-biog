import axios from "axios";

const REST_API_URL = "http://localhost:8080/auth/";

const register = (
  cne: string,
  email: string,
  password: string,
  numApogee: number,
  firstName: string,
  lastName: string,
  schoolCard: string
) => {
  return axios.post(REST_API_URL + "signup", {
    cne,
    numApogee,
    firstName,
    lastName,
    email,
    password,
    schoolCard,
  });
};

const login = (email: string, password: string) => {
  return axios
    .post(REST_API_URL + "authenticate", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", response.data.token);
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  return axios.post(REST_API_URL + "logout").then((response) => {
    return response.data;
  });
};

const AuthService = {
  register,
  login,
  logout,
};

export default AuthService;
