import { createContext } from "react"
export type AllMoviesType = {
    "Key": number,
    "Title": string,
    "Year": number
  }
export const ListContext = createContext<AllMoviesType[]>(new Array<AllMoviesType>())