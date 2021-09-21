export type userType = {
  _id: string,
  login: string,
  card: number,
  cash: number,
  created: Date,
  isFirstEnter: boolean,
  fullName?: string
}