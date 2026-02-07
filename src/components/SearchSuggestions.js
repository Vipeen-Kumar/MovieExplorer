import React from 'react';
import { useNavigate } from 'react-router-dom';

const SearchSuggestions = ({ 
    suggestions, 
    onSelect, 
    activeIndex, 
    isLoading, 
    error, 
    searchQuery,
    isVisible 
}) => {
    const navigate = useNavigate();

    if (!isVisible || (!isLoading && suggestions.length === 0 && !error)) return null;

    const highlightText = (text, query) => {
        if (!query) return text;
        const parts = text.split(new RegExp(`(${query})`, 'gi'));
        return (
            <span>
                {parts.map((part, i) => 
                    part.toLowerCase() === query.toLowerCase() ? (
                        <mark key={i} className="bg-red-600 text-white p-0 rounded-sm">{part}</mark>
                    ) : (
                        part
                    )
                )}
            </span>
        );
    };

    return (
        <div 
            className="absolute top-full left-0 right-0 mt-2 bg-neutral-900 border border-neutral-800 rounded-lg shadow-2xl overflow-hidden z-50 max-h-[400px] overflow-y-auto"
            role="listbox"
            aria-label="Search suggestions"
        >
            {isLoading && (
                <div className="p-4 text-center text-neutral-400">
                    <div className="inline-block w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                    Fetching suggestions...
                </div>
            )}

            {error && (
                <div className="p-4 text-center text-red-500">
                    Failed to load suggestions.
                </div>
            )}

            {!isLoading && suggestions.length === 0 && searchQuery && (
                <div className="p-4 text-center text-neutral-500">
                    No results found for "{searchQuery}"
                </div>
            )}

            {!isLoading && suggestions.length > 0 && (
                <ul className="py-1">
                    {suggestions.map((item, index) => (
                        <li 
                            key={item.id + "-" + index}
                            onClick={() => onSelect(item)}
                            onMouseEnter={() => {/* Optional: update activeIndex on hover */}}
                            className={`px-4 py-3 cursor-pointer flex items-center gap-3 transition-colors ${
                                index === activeIndex ? 'bg-neutral-800' : 'hover:bg-neutral-800/50'
                            }`}
                            role="option"
                            aria-selected={index === activeIndex}
                        >
                            <div className="w-10 h-14 bg-neutral-800 flex-shrink-0 rounded overflow-hidden">
                                {item.poster_path ? (
                                    <img 
                                        src={`https://image.tmdb.org/t/p/w92${item.poster_path}`} 
                                        alt="" 
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-[10px] text-neutral-600">No Img</div>
                                )}
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="text-sm font-medium text-neutral-100 truncate">
                                    {highlightText(item.title || item.name, searchQuery)}
                                </p>
                                <p className="text-xs text-neutral-500 capitalize">
                                    {item.media_type} {item.release_date || item.first_air_date ? `• ${(item.release_date || item.first_air_date).split('-')[0]}` : ''}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchSuggestions;
