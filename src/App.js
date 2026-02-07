import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileNavigation from './components/MobileNavigation';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBannerData, setImageURL } from './store/movieExplorerSlice';
import GenreSelection from './components/GenreSelection';
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const dispatch = useDispatch()
  const { hasSelectedGenres } = useSelector(state => state.user)
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth0()

  const fetchTrendingData = async()=>{
    try {
        const response = await axios.get('/trending/all/week')
        console.log("Trending Data Response:", response.data);
        dispatch(setBannerData(response.data.results))
    } catch (error) {
        console.error("fetchTrendingData error:", error.response ? error.response.data : error.message);
    }
  }

  const fetchConfiguration = async()=>{
    try {
        const response = await axios.get("/configuration")
        console.log("Configuration Response:", response.data);
        dispatch(setImageURL(response.data.images.secure_base_url+"original"))
    } catch (error) {
        console.error("fetchConfiguration error:", error.response ? error.response.data : error.message);
    }
  }

  useEffect(()=>{
    fetchTrendingData()
    fetchConfiguration()
  },[])
  
  return (
    <main className='pb-14 lg:pb-0'>
        <Header/>
        <div className='min-h-[90vh]'>
            <Outlet/>
        </div>
        <Footer/>
        <MobileNavigation/>

        {isAuthenticated && !hasSelectedGenres && !isAuthLoading && (
            <GenreSelection />
        )}
    </main>
  );
}

export default App;
