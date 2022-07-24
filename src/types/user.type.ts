export type userType = {
  _id: string;
  login: string;
  created: Date;
  isFirstEnter: boolean;
};
export type loginResponseType = {
  accessToken: string;
  refreshToken: string;
  user: userType;
};

export type signUpResponseType = {
  message: string;
};

export type authData = {
  login: string;
  password: string;
};

export type updateUserResponseType = {
  message: string;
  user: userType;
};
