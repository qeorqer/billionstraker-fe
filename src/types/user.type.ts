export type userType = {
  _id: string;
  login: string;
  card: number;
  cash: number;
  created: Date;
  isFirstEnter: boolean;
  fullName?: string;
};
export type loginResponseType = {
  accessToken: string;
  refreshToken: string;
  user: userType;
};

export type signUpResponseType = {
  messageRu: string;
  messageEn: string;
};

export type authData = {
  login: string;
  password: string;
};

export type updateUserResponseType = {
  messageRu: string;
  messageEn: string;
  user: userType;
};
