import axios from "axios"
import { useEffect, useState } from "react"

const useFetchDetails = (endpoint)=>{
    const [data,setData] = useState()
    const [loading,setLoading] = useState(false)

    const fetchData = async()=>{
        try {
            setLoading(true)
            const response = await axios.get(endpoint)
            setLoading(false)
            console.log(`Fetch Details from ${endpoint}:`, response.data);
            setData(response.data)
        } catch (error) {
            setLoading(false)
            console.error(`useFetchDetails error for ${endpoint}:`, error.response ? error.response.data : error.message);
       }
    }

    useEffect(()=>{
        fetchData()
    },[endpoint])

    return { data , loading}
}

export default useFetchDetails