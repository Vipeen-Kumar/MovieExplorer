import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import useDebounce from '../hooks/useDebounce'
import SearchSuggestions from '../components/SearchSuggestions'

const SearchPage = () => {
  const location = useLocation()
  const [data,setData] = useState([])
  const [page,setPage] = useState(1)
  const navigate = useNavigate()

  const query = location?.search?.slice(3)
  const [searchString,setSearchString] = useState(query?.split("%20")?.join(" "))
  
  // Suggestions state for mobile
  const [suggestions, setSuggestions] = useState([])
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false)
  const [suggestionError, setSuggestionError] = useState(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const suggestionRef = useRef(null)

  const debouncedSearch = useDebounce(searchString, 300)

  useEffect(() => {
    const fetchSuggestions = async () => {
        if (!debouncedSearch || debouncedSearch.trim().length < 2) {
            setSuggestions([])
            return
        }

        setIsLoadingSuggestions(true)
        setSuggestionError(null)
        try {
            const response = await axios.get(`search/multi`, {
                params: {
                    query: debouncedSearch,
                    page: 1
                }
            })
            setSuggestions(response.data.results.slice(0, 8))
        } catch (err) {
            setSuggestionError(err)
        } finally {
            setIsLoadingSuggestions(false)
        }
    }

    fetchSuggestions()
  }, [debouncedSearch])

  useEffect(() => {
    const handleClickOutside = (event) => {
        if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
            setShowSuggestions(false)
        }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(()=>{
    setSearchString(query?.split("%20")?.join(" "))
  },[query])

  const fetchData = async()=>{
    try {
        const response = await axios.get(`search/multi`,{
          params : {
            query :location?.search?.slice(3),
            page : page
          }
        })
        setData((preve)=>{
          return[
              ...preve,
              ...response.data.results
          ]
        })
    } catch (error) {
        console.log('error',error)
    }
  }

  useEffect(()=>{
    if(query){
      setPage(1)
      setData([])
      fetchData()
    }
  },[location?.search])


  const handleScroll = ()=>{
    if((window.innerHeight + window.scrollY ) >= document.body.offsetHeight){
      setPage(preve => preve + 1)
    }
  }

  useEffect(()=>{
    if(query){
      fetchData()
    }
  },[page])

  useEffect(()=>{
    window.addEventListener('scroll',handleScroll)
},[])

  const handleSelectSuggestion = (item) => {
    const query = item.title || item.name
    setSearchString(query)
    navigate(`/search?q=${query}`)
    setShowSuggestions(false)
  }

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return

    if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev))
    } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex(prev => (prev > 0 ? prev - 1 : prev))
    } else if (e.key === 'Enter' && activeIndex >= 0) {
        e.preventDefault()
        handleSelectSuggestion(suggestions[activeIndex])
    } else if (e.key === 'Escape') {
        setShowSuggestions(false)
    }
  }

  return (
    <div className='py-16'>

        <div className='lg:hidden my-2 mx-1 sticky top-[70px] z-30' ref={suggestionRef}>
            <form onSubmit={(e)=>{
              e.preventDefault()
              navigate(`/search?q=${searchString}`)
              setShowSuggestions(false)
            }}>
              <input 
                type='text'
                placeholder='Search here...'
                onChange={(e)=> {
                  setSearchString(e.target.value)
                  setShowSuggestions(true)
                  setActiveIndex(-1)
                }}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={handleKeyDown}
                value={searchString}
                className='px-4 py-1 text-lg w-full bg-white rounded-full text-neutral-900 '
              />
            </form>
            <SearchSuggestions 
                suggestions={suggestions}
                onSelect={handleSelectSuggestion}
                activeIndex={activeIndex}
                isLoading={isLoadingSuggestions}
                error={suggestionError}
                searchQuery={searchString}
                isVisible={showSuggestions && searchString.length > 0}
            />
        </div>
        <div className='container mx-auto'>
          <h3 className='capitalize text-lg lg:text-xl font-semibold my-3'>Search Results</h3>

          <div className='grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start'>
              {
                data.map((searchData,index)=>{
                  return(
                    <Card data={searchData} key={searchData.id+"search"} media_type={searchData.media_type}/>
                  )
                })
              }
          </div>

        </div>
    </div>
  )
}

export default SearchPage
