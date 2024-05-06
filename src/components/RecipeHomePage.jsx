import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RecipeHomePage = () => {
    // Dummy data for tags and recipes data

    const [recipes, setRecipes] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);

  

    


    const fetchRecipes = async () => {
        const response = await fetch('/api/recipes');
        const data = await response.json();
        setRecipes(data.data);
    };
    useEffect(() => { fetchRecipes(); }, []);
    // const fetchRecipes = async (searchTerm = '') => {
    //     let endpoint = '/api/recipes';
    //     if (searchTerm) {
    //         endpoint += `?q=${encodeURIComponent(searchTerm)}`;
    //     }
    //     const response = await fetch(endpoint);
    //     const data = await response.json();
    //     setRecipes(data.data);
    // };

    const tags = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Fast Food', 'Vegan', 'Desserts', 'Salads', 'Seafood', 'Italian Cuisine', 'Beverages']

  

    // State for the active tag
    const [activeTag, setActiveTag] = useState('All');


    const navigate = useNavigate();


    const goToCreateRecipe = () => {
        

        navigate('/createrecipe');
    };



    // const handleSearchChange = debounce(async (event) => {
    //     const input = event.target.value;
    //     setSearchTerm(input);
    
    //     if (input.length > 2) {
    //         try {
    //             const response = await fetch(`/api/searchRecipes?q=${encodeURIComponent(input)}&tag=${encodeURIComponent(activeTag)}`);
    //             if (!response.ok) {
    //                 throw new Error('Failed to fetch: ' + response.statusText);
    //             }
    //             const data = await response.json();
    //             setSuggestions(data.data.map(recipe => recipe.name));
    //         } catch (error) {
    //             console.error('Failed to load data:', error);
    //             setSuggestions([]); // Reset suggestions or handle error differently
    //         }
    //     } else {
    //         setSuggestions([]);
    //     }
    // }, 300);

    // const handleSearchChange = async (event) => {
    //     const input = event.target.value;
    //     setSearchTerm(input);
    //     console.log(searchTerm);

    
    //     if (input.length > 2) {
    //         try {
    //             const response = await fetch(`/api/searchRecipes?q=${encodeURIComponent(searchTerm)}`);
    //             if (!response.ok) {
    //                 throw new Error('Failed to fetch: ' + response.statusText);
    //             }
    //             const data = await response.json();
    //             setSuggestions(data.data.map(recipe => recipe.name));
    //         } catch (error) {
    //             console.error('Failed to load data:', error);
    //             setSuggestions([]); // Reset suggestions or handle error differently
    //         }
    //     } else {
    //         setSuggestions([]);
    //     }
    // };
    const debounce = (func, delay) => {
        let inDebounce;
        return function(...args) {
            clearTimeout(inDebounce);
            inDebounce = setTimeout(() => func(...args), delay);
        };
    };

    const fetchSuggestions = async (searchValue) => {
        if (searchValue.length > 2) {
            try {
                const response = await fetch(`/api/searchRecipes?q=${encodeURIComponent(searchValue)}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch: ' + response.statusText);
                }
                const data = await response.json();
                setSuggestions(data.data.map(recipe => recipe.name));
            } catch (error) {
                console.error('Failed to load data:', error);
                setSuggestions([]); // Optionally reset suggestions or handle error differently
            }
        } else {
            setSuggestions([]);
        }
    };

    const debouncedFetchSuggestions = debounce(fetchSuggestions, 400);

    const handleSearchChange = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
        debouncedFetchSuggestions(value);
    };

    const handleSuggestionClick = (name) => {
        setSearchTerm(name);
        setSuggestions([]);
        fetchRecipes(name);
    };

    if (recipes === undefined) {
        return (<div><progress className="progress is-small is-primary" max="100">Loading</progress></div>)
    };



    return (
        <div>
            <div className="tabs">
                <ul>
                    {tags.map((tag) => (
                        <li
                            key={tag}
                            className={activeTag === tag ? 'is-active' : ''}
                            onClick={() => setActiveTag(tag)}
                        >
                            <a>{tag}</a>
                        </li>
                    ))}
                </ul>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="field" style={{ width: '70%' }}>
                    <p className="control has-icons-left">
                        <input
                            className="input"
                            type="search"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <span className="icon is-left">
                            <i className="fas fa-search"></i>
                        </span>
                        <div className="list is-hoverable">
                            {suggestions.map((suggestion, index) => (
                                <a key={index} className="list-item" class="box" onClick={() => handleSuggestionClick(suggestion)}>
                                    {suggestion}
                                </a>
                            ))}
                        </div>
                    </p>
                </div>
                <button className="button is-primary" style={{ marginBottom: '10px', marginLeft: '10px' }} onClick={goToCreateRecipe}>
                    + Create Recipe
                </button>
            </div>

            <div className="columns is-multiline">
                {recipes
                    .filter((recipe) => activeTag === 'All' || recipe.tag.includes(activeTag))
                    .map((recipe) => (
                        <div className="column is-one-fifth" key={recipe._id}>
                            <div className="card">
                                <div className="card-image">
                                    {/* Placeholder for recipe image */}
                                    <figure className="image is-4by3">
                                        <img src={recipe.pictureUrl} alt={recipe.name} onClick={() => navigate('/aboutrecipe/' + recipe._id)} />
                                        {/* <img src={recipe.pictureUrl} alt={recipe.name} onClick={() => navigate(`/aboutrecipe/${encodeURIComponent(recipe.name)}`)} /> */}
                                    </figure>
                                </div>
                                <div className="card-content">
                                    <p className="title is-5 has-text-centered">{recipe.name}</p>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default RecipeHomePage;