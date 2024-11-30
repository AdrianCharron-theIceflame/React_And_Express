import { createContext } from "react"
type ListContextType = {
    key:number
    title:string,
    year:number
}
export const ListContext = createContext<ListContextType[]>(new Array<ListContextType>())