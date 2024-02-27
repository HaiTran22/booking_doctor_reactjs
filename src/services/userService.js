import axios from "../axios";

const handleLoginApi = (email, password) => {
  return axios.post("/api/login", { email, password });
};

const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`, { id: inputId });
};

const postVerifyBookAppointment = (data) =>{
  return axios.post('/api/verify-book-appointment', data)
};

const postSendRemedy = (data) => {
  return axios.post(`/api/send-remedy`, data);
};

const getConfirm = (data) => {
  return axios.post(`/api/get-confirm`, data);
};

const postSendRefuse = (data) => {
  return axios.post(`/api/send-refuse`, data);
};

const postPatientBookAppointment = (data) => {
  return axios.post("/api/patient-book-appointment", data);
};

const checkAccount = (data) => {
  return axios.post("/api/check-email", data);
};

const handleResetPassword = (data) => {
  return axios.post("/api/check-OTP-reset-Password", data);
};
export { postSendRemedy, getConfirm, postSendRefuse, postPatientBookAppointment,  handleLoginApi, getAllUsers, postVerifyBookAppointment, checkAccount,
  handleResetPassword };
