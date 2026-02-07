import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import HorizontalScollCard from './HorizontalScollCard';

const Recommendations = () => {
    const { favoriteGenres } = useSelector(state => state.user);
    const [recommendations, setRecommendations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecommendations = async () => {
            if (!favoriteGenres || favoriteGenres.length === 0) return;

            setIsLoading(true);
            setError(null);
            try {
                // Get a random genre from favorites for variety
                const randomGenre = favoriteGenres[Math.floor(Math.random() * favoriteGenres.length)];
                
                // Fetch movies for that genre
                const response = await axios.get('/discover/movie', {
                    params: {
                        with_genres: randomGenre.id,
                        sort_by: 'popularity.desc',
                        page: 1
                    }
                });

                setRecommendations({
                    heading: `Because you like ${randomGenre.name}`,
                    data: response.data.results
                });
            } catch (err) {
                console.error("Error fetching recommendations:", err);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecommendations();
    }, [favoriteGenres]);

    if (!favoriteGenres || favoriteGenres.length === 0) return null;
    if (isLoading && recommendations.length === 0) {
        return (
            <div className='container mx-auto px-3 my-10'>
                <div className='h-8 w-64 bg-neutral-800 animate-pulse rounded mb-4'></div>
                <div className='flex gap-4 overflow-hidden'>
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className='min-w-[230px] h-[350px] bg-neutral-800 animate-pulse rounded'></div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) return null;

    return (
        <div className='container mx-auto px-3 my-10'>
            <HorizontalScollCard 
                data={recommendations.data} 
                heading={recommendations.heading} 
                media_type="movie"
            />
        </div>
    );
};

export default Recommendations;
