module.exports = {
  //Status Codes
  STATUS_CODE_200: 200,
  STATUS_CODE_401: 401,
  STATUS_CODE_400: 400,
  STATUS_CODE_404: 404,
  STATUS_CODE_500: 500,

  //Constants for VALIDATION MESSAGES for REGISTER USER
  NAME_REQUIRED: "Name is required",
  EMAIL_REQUIRED_INVALID: "Please enter a valid Email",
  PASSWORD_INVALID:
    "Password should not be empty, minimum 8 characters with atleast 1 uppercase, 1 lowercase, 1 digit and 1 symbol",
  USER_EXISTS: "User already exists",

  //Constants For User API End
  ID: "Id",
  NAME: "name",
  EMAIL: "email",
  PASSWORD: "password",

  //Constants For Auth API Start
  SERVER_ERROR: "Internal Server Error.",
  USER_LOGGEDIN: "User LoggedIn.",

  INVALID_CREDENTIALS: "Invalid Email or Password",
  EXPIRES_IN: "8h",

  //Messeges
  INVALID_TOKEN: "Token is Invalid.",
  AUTH_DENIED: "Authorization Denied.",
  NO_TOKEN: "No Token.",
  NOT_FOUND: "NOT FOUND",

  //API SECRET
  JWT_SECRET: "jwtSecret",
  COMMON_PASSWORD: "password",

  //EMAIL CONFIGS
  EMAIL_ID: "myemail@email.com",
  EMAIL_PASSWORD: "may@2020",
  HOST: "webmail.myhost.com",
  PORT: 25,
};
