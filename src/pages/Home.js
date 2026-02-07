import React, { useEffect, useState } from 'react'
import BannerHome from '../components/BannerHome'
import { useSelector } from 'react-redux'
import Card from '../components/Card'
import HorizontalScollCard from '../components/HorizontalScollCard'
import axios from 'axios'
import useFetch from '../hooks/useFetch'
import Recommendations from '../components/Recommendations'

const Home = () => {
  const trendingData = useSelector(state => state.movieExplorerData.bannerData)
  const { data : nowPlayingData } = useFetch('/movie/now_playing')
  const { data : topRatedData } = useFetch('/movie/top_rated')
  const { data : popularTvShowData } = useFetch('/tv/popular')
  const { data : onTheAirShowData } = useFetch('/tv/on_the_air')
  
  return (
    <div>
        <BannerHome/>
        <Recommendations />
        <HorizontalScollCard data={trendingData} heading={"Trending"} trending={true}/>
        <HorizontalScollCard data={nowPlayingData} heading={"Now Playing"} media_type={"movie"}/>
        <HorizontalScollCard data={topRatedData} heading={"Top Rated Movies"} media_type={"movie"}/>
        <HorizontalScollCard data={popularTvShowData} heading={"Popular TV Show"} media_type={"tv"}/>
        <HorizontalScollCard data={onTheAirShowData} heading={"On The Air"} media_type={"tv"}/>
        
    </div>
  )
}

export default Home
