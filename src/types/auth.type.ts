import { userType } from "./user.type";

export type loginResponseType ={
  accessToken:string,
  refreshToken:string,
  user: userType
}

export type signUpResponseType = {
  messageRu: string,
  messageEn: string,
}

export type authData = {
  login: string,
  password: string
}
