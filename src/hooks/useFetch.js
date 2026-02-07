import axios from "axios"
import { useEffect, useState } from "react"

const useFetch = (endpoint)=>{
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)

    const fetchData = async()=>{
        try {
            setLoading(true)
            const response = await axios.get(endpoint)
            setLoading(false)
            console.log(`Fetch Data from ${endpoint}:`, response.data);
            setData(response.data.results)
        } catch (error) {
            setLoading(false)
            console.error(`useFetch error for ${endpoint}:`, error.response ? error.response.data : error.message);
       }
    }

    useEffect(()=>{
        fetchData()
    },[endpoint])

    return { data , loading}
}

export default useFetch