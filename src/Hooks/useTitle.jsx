import { useEffect } from "react"

const useTitle=(title)=>{
    useEffect(()=>{
        document.title=`FitNex | ${title}`
    })
}

export default useTitle