// Define a more reliable base URL configuration
// For development on physical devices, use the IP address
// For development on emulators, use 10.0.2.2 (Android) or localhost (iOS)
// For production, use your deployed API URL
// Ensure this is set in your environment variables

// Check if we're running in development or production
const isDev = process.env.NODE_ENV !== "production";

// Use localhost for development and actual domain for production
const BASE_URL = process.env.SERVER_URL || (isDev ? "http://localhost:5000/api" : "https://your-production-domain.com/api");
console.log("API Base URL:", BASE_URL);

// AUTHENTICATION API
export const authApi = {
  POST_SEND_OTP_API: BASE_URL + "/auth/sendotp",
  POST_SIGNUP_USER_API: BASE_URL + "/auth/signup",
  POST_LOGIN_USER_API: BASE_URL + "/auth/login",
  POST_LOGOUT_USER_API: BASE_URL + "/auth/logout",
  POST_FORGOT_PASSWORD_API: BASE_URL + "/auth/forgot-password",
  POST_VERIFY_OTP_API: BASE_URL + "/auth/verify-otp",
  POST_RESET_PASSWORD_API: BASE_URL + "/auth/reset-password",
  //   GET_GET_ME_API: BASE_URL + '/auth/getme',
  //   PUT_CHANGE_PASSWORD_API: BASE_URL + '/auth/changepassword',
  //   POST_CREATE_ADMIN_API: BASE_URL + '/auth/createadmin',
};
export const PDAApi = {
  Post_PDAForm_Save_API: BASE_URL + "/pda/register",
};

// USER API
export const userApi = {
  // GET_GET_ALL_USERS_API: BASE_URL + '/users',
  // GET_GET_USER_API: BASE_URL + '/users/getuser', // /userId
  // PUT_CHANGE_AVATAR_API: BASE_URL + '/users/changeavatar',
  // GET_GET_ENROLLED_COURSES_API: BASE_URL + '/users/getenrolledcourses',
  // GET_GET_CREATED_COURSES_API: BASE_URL + '/users/getcreatedcourses',
  GET_GET_INSTRUCTOR_DASHBOARD_DATA_API:
    BASE_URL + "/users/getinstructordashboarddata",
  // GET_GET_ALL_REVIEWS_BY_USER_API: BASE_URL + '/users/getallreviews',
  // DELETE_DELETE_CURRENT_USER_API: BASE_URL + '/users/deletecurrentuser',
  GET_CURRENT_LOGGED_USER_API: BASE_URL + "/users/currentuser",
};
