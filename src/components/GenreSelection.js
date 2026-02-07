import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFavoriteGenres } from '../store/userSlice';
import axios from 'axios';
import { IoCheckmark } from "react-icons/io5";

const GenreSelection = () => {
    const [genres, setGenres] = useState([]);
    const [selected, setSelected] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                // Fetch both movie and tv genres
                const [movieRes, tvRes] = await Promise.all([
                    axios.get('genre/movie/list'),
                    axios.get('genre/tv/list')
                ]);
                
                // Combine and remove duplicates by ID
                const allGenres = [...movieRes.data.genres, ...tvRes.data.genres];
                const uniqueGenres = Array.from(new Map(allGenres.map(item => [item.id, item])).values());
                
                setGenres(uniqueGenres);
            } catch (error) {
                console.error("Error fetching genres:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchGenres();
    }, []);

    const toggleGenre = (genre) => {
        if (selected.find(s => s.id === genre.id)) {
            setSelected(selected.filter(s => s.id !== genre.id));
        } else {
            setSelected([...selected, genre]);
        }
    };

    const handleSave = () => {
        if (selected.length > 0) {
            dispatch(setFavoriteGenres(selected));
        }
    };

    return (
        <div className="fixed inset-0 bg-black z-[110] flex items-center justify-center p-4">
            <div className="w-full max-w-4xl max-h-[90vh] flex flex-col">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Hey {user?.name.split(' ')[0]}! 👋
                    </h2>
                    <p className="text-neutral-400 text-lg">
                        Tell us what you like. Select your favorite genres to personalize your experience.
                    </p>
                </div>

                {isLoading ? (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="flex-1 overflow-y-auto px-2 py-4">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {genres.map(genre => {
                                const isSelected = selected.find(s => s.id === genre.id);
                                return (
                                    <button
                                        key={genre.id}
                                        onClick={() => toggleGenre(genre)}
                                        className={`relative group px-4 py-6 rounded-xl border transition-all duration-300 flex flex-col items-center justify-center gap-3 ${
                                            isSelected 
                                            ? 'bg-red-600 border-red-600 scale-105 shadow-lg shadow-red-600/20' 
                                            : 'bg-neutral-900 border-neutral-800 hover:border-neutral-600'
                                        }`}
                                    >
                                        <span className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-neutral-300'}`}>
                                            {genre.name}
                                        </span>
                                        {isSelected && (
                                            <div className="absolute top-2 right-2 bg-white text-red-600 rounded-full p-0.5 scale-90">
                                                <IoCheckmark />
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                <div className="mt-10 flex justify-center">
                    <button
                        onClick={handleSave}
                        disabled={selected.length === 0}
                        className={`px-12 py-4 rounded-full font-bold text-lg transition-all active:scale-95 ${
                            selected.length > 0
                            ? 'bg-red-600 text-white hover:bg-red-700 shadow-xl shadow-red-600/20'
                            : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                        }`}
                    >
                        {selected.length === 0 ? 'Select at least one' : `Start Exploring (${selected.length})`}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GenreSelection;
