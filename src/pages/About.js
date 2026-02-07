import React from 'react'

const About = () => {
  return (
    <div className='pt-16'>
      <div className='container mx-auto px-3 py-10'>
        <h1 className='text-3xl font-bold mb-5'>About Movie Explorer</h1>
        <p className='text-lg text-neutral-400 mb-4'>
          Welcome to Movie Explorer, your ultimate destination for discovering the latest and greatest in movies and TV shows.
        </p>
        <p className='text-neutral-400 mb-4'>
          Our mission is to provide movie enthusiasts with a comprehensive and user-friendly platform to explore trending content, search for their favorite titles, and stay updated with what's now playing and top-rated in the world of entertainment.
        </p>
        <p className='text-neutral-400 mb-4'>
          Built with React, Redux Toolkit, and Tailwind CSS, Movie Explorer leverages The Movie Database (TMDB) API to bring you real-time data, high-quality images, and trailers.
        </p>
        <div className='mt-8'>
          <h2 className='text-2xl font-semibold mb-3'>Key Features</h2>
          <ul className='list-disc list-inside text-neutral-400 space-y-2'>
            <li>Explore trending movies and TV shows.</li>
            <li>Detailed information including cast, ratings, and descriptions.</li>
            <li>Watch trailers directly on the platform.</li>
            <li>Search for any movie or TV show.</li>
            <li>Responsive design for a seamless experience on all devices.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default About
