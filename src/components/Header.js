import React, { useEffect, useState, useRef } from 'react'
import logo from '../assets/logo.png'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import userIcon from '../assets/user.png'
import { IoSearchOutline } from "react-icons/io5";
import { navigation } from '../contants/navigation';
import useDebounce from '../hooks/useDebounce';
import axios from 'axios';
import SearchSuggestions from './SearchSuggestions';
import { useDispatch, useSelector } from 'react-redux';
import Login from './Login';
import { logout as reduxLogout, setUser } from '../store/userSlice';
import { useAuth0 } from '@auth0/auth0-react';


const Header = () => {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const qValue = queryParams.get('q')
    const [searchInput,setSearchInput] = useState(qValue || "")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    // Auth0 hook
    const { 
        user: auth0User, 
        isAuthenticated, 
        logout: auth0Logout, 
        isLoading: isAuthLoading 
    } = useAuth0();
    
    // Auth state from Redux (for genres)
    const { user: reduxUser } = useSelector(state => state.user)
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    const [showUserMenu, setShowUserMenu] = useState(false)
    const userMenuRef = useRef(null)
    
    // Sync Auth0 user with Redux
    useEffect(() => {
        if (isAuthenticated && auth0User) {
            const userToStore = {
                id: auth0User.sub,
                name: auth0User.name,
                email: auth0User.email,
                profilePic: auth0User.picture
            };
            dispatch(setUser(userToStore));
        }
    }, [isAuthenticated, auth0User, dispatch]);

    // Update search input when 'q' param changes, but ignore Auth0 params
    useEffect(() => {
        if (qValue !== null) {
            setSearchInput(qValue)
        } else if (!location.pathname.includes('/search')) {
            // Clear input if not on search page and no q param
            setSearchInput("")
        }
    }, [qValue, location.pathname])
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
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setShowUserMenu(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

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

    const handleLogout = () => {
        dispatch(reduxLogout())
        auth0Logout({ logoutParams: { returnTo: window.location.origin } })
        setShowUserMenu(false)
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

                    {isAuthenticated ? (
                        <div className='relative' ref={userMenuRef}>
                            <div 
                                className='w-8 h-8 rounded-full overflow-hidden cursor-pointer active:scale-90 transition-all border border-neutral-700 hover:border-red-600'
                                onClick={() => setShowUserMenu(!showUserMenu)}
                            >
                                <img
                                    src={reduxUser?.profilePic || userIcon}
                                    alt="user"
                                    className='w-full h-full object-cover'
                                />
                            </div>
                            
                            {showUserMenu && (
                                <div className='absolute top-full right-0 mt-2 w-48 bg-neutral-900 border border-neutral-800 rounded-lg shadow-2xl py-2 z-50'>
                                    <div className='px-4 py-2 border-b border-neutral-800 mb-2'>
                                        <p className='text-sm font-semibold text-white truncate'>{reduxUser?.name}</p>
                                        <p className='text-xs text-neutral-500 truncate'>{reduxUser?.email}</p>
                                    </div>
                                    <button 
                                        onClick={handleLogout}
                                        className='w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-neutral-800 transition-colors'
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button 
                            disabled={isAuthLoading}
                            onClick={() => setIsLoginModalOpen(true)}
                            className='bg-red-600 text-white px-5 py-1.5 rounded-full text-sm font-semibold hover:bg-red-700 transition-all active:scale-95 disabled:bg-neutral-800'
                        >
                            {isAuthLoading ? '...' : 'Sign Up'}
                        </button>
                    )}
                </div>
            </div>

            <Login 
                isOpen={isLoginModalOpen} 
                onClose={() => setIsLoginModalOpen(false)} 
            />
    </header>
  )
}

export default Header
