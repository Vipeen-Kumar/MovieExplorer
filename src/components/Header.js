import React, { useEffect, useState, useRef } from 'react'
import logo from '../assets/logo.png'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import userIcon from '../assets/user.png'
import { IoSearchOutline } from "react-icons/io5";
import { navigation } from '../contants/navigation';
import useDebounce from '../hooks/useDebounce';
import axios from 'axios';
import SearchSuggestions from './SearchSuggestions';


const Header = () => {
    const location = useLocation()
    const removeSpace = location?.search?.slice(3)?.split("%20")?.join(" ")
    const [searchInput,setSearchInput] = useState(removeSpace)
    const navigate = useNavigate()
    
    // Suggestions state
    const [suggestions, setSuggestions] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [activeIndex, setActiveIndex] = useState(-1)
    const suggestionRef = useRef(null)

    const debouncedSearch = useDebounce(searchInput, 300)

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (!debouncedSearch || debouncedSearch.trim().length < 2) {
                setSuggestions([])
                return
            }

            setIsLoading(true)
            setError(null)
            try {
                const response = await axios.get(`search/multi`, {
                    params: {
                        query: debouncedSearch,
                        page: 1
                    }
                })
                // Limit to top 8 suggestions
                setSuggestions(response.data.results.slice(0, 8))
            } catch (err) {
                console.error("Suggestion fetch error:", err)
                setError(err)
            } finally {
                setIsLoading(false)
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
        if(removeSpace){
            setSearchInput(removeSpace)
        }
    },[location])

    const handleSubmit = (e)=>{
        e.preventDefault()
        if(searchInput){
            navigate(`/search?q=${searchInput}`)
            setShowSuggestions(false)
        }
    }

    const handleSelectSuggestion = (item) => {
        const query = item.title || item.name
        setSearchInput(query)
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
    <header className='fixed top-0 w-full h-16 bg-black bg-opacity-50 z-40'>
            <div className='container mx-auto px-3 flex items-center h-full'>
                <Link to={"/"}>
                    <img
                        src={logo}
                        alt='logo'
                        width={120} 
                    />
                </Link>

                <nav className='hidden lg:flex items-center gap-1 ml-5'>
                    {
                        navigation.map((nav,index)=>{
                            return(
                                <div key={nav.label+"header"+index}>
                                    <NavLink to={nav.href} className={({isActive})=>`px-2 hover:text-neutral-100 ${isActive && "text-neutral-100"}`}>
                                        {nav.label}
                                    </NavLink>
                                </div>
                            )
                        })
                    }
                </nav>

                <div className='ml-auto flex items-center gap-5'>
                    <div className='relative' ref={suggestionRef}>
                        <form className='flex items-center gap-2' onSubmit={handleSubmit}>
                            <input
                                type='text'
                                placeholder='Search here...'
                                className='bg-transparent px-4 py-1 outline-none border-none hidden lg:block'
                                onChange={(e)=>{
                                    setSearchInput(e.target.value)
                                    setShowSuggestions(true)
                                    setActiveIndex(-1)
                                }}
                                onFocus={() => setShowSuggestions(true)}
                                onKeyDown={handleKeyDown}
                                value={searchInput}
                                aria-autocomplete="list"
                                aria-controls="search-results"
                                aria-expanded={showSuggestions}
                            />
                            <button className='text-2xl text-white'>
                                    <IoSearchOutline/>
                            </button>
                        </form>

                        <SearchSuggestions 
                            suggestions={suggestions}
                            onSelect={handleSelectSuggestion}
                            activeIndex={activeIndex}
                            isLoading={isLoading}
                            error={error}
                            searchQuery={searchInput}
                            isVisible={showSuggestions && searchInput.length > 0}
                        />
                    </div>
                    <div className='w-8 h-8 rounded-full overflow-hidden cursor-pointer active:scale-50 transition-all'>
                        <img
                            src={userIcon}
                            alt="user"
                            width='w-ful h-full' 
                        />
                    </div>
                </div>
            </div>
    </header>
  )
}

export default Header
