export type categoryType = {
  _id:string,
  nameEn: string,
  nameRu: string,
  isExpense: boolean
}

export type categoryResponseType = {
  message: string,
  categories: categoryType[]
}