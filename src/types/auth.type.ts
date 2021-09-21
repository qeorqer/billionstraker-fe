import { userType } from "./user.type";

export type loginResponseType ={
  accessToken:string,
  refreshToken:string,
  user: userType
}

export type signUpResponseType = {
  message: string
}

export type authData = {
  login: string,
  password: string
}
