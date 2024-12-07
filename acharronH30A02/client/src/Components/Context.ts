import { createContext } from "react"
export const SelectorContext = createContext({chooseMovie: (id:number | null = null) => {}})