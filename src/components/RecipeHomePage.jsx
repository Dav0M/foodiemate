import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RecipeHomePage = () => {
    // Dummy data for categories and recipes data

    const [recipes, setRecipes] = useState();
    // const [newTodo, setNewTodo] = useState('');
    // const [error, setError] = useState('');


    // const fetchRecipes = () => {
    //     fetch('/api/recipes')
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error('HTTP error: Status: ' + response.status);
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             if (!Array.isArray(data.data)) {
    //                 console.error('Data received is not an array:', data.data);
    //                 throw new TypeError('Expected an array. get else.');
    //             }
    //             setRecipes(data.data);
    //         })
    //         .catch(error => {
    //             console.error('Failed to fetch recipes:', error);
    //         });
    // };

    // useEffect(() => { fetchRecipes() }, []);

    const fetchRecipes = async () => {
        const response = await fetch('/api/recipes');
        const data = await response.json();
        setRecipes(data.data);
    };
    useEffect(() => { fetchRecipes(); }, []);

    const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Fast Food', 'Vegan', 'Desserts', 'Salads', 'Seafood', 'Italian Cuisine', 'Beverages']

    // const categories = ['All', 'Breakfast', 'Fast Food', 'Desserts', 'Salads', 'Seafood', 'Italian cuisine', 'Beverages'];
    // const recipes = [
    //     { name: 'Chicken Salad', category: 'Salads' },
    //     { name: 'Spaghetti', category: 'Italian cuisine' },
    //     { name: 'Caesar Salad', category: 'Salads' },
    //     { name: 'Tuna Casserole', category: 'Seafood' },
    //     { name: 'Clam Chowder', category: 'Seafood' },
    //     { name: 'Beef Stew', category: 'All' },
    //     { name: 'Hamburger', category: 'Fast Food' },
    // ];

    // State for the active category
    const [activeCategory, setActiveCategory] = useState('All');

    // Use navigate function from react-router-dom to programmatically navigate
    const navigate = useNavigate();

    // Navigate to Create Recipe page
    const goToCreateRecipe = () => {
        // for future use
        // if (user) {
        //     navigate('/createrecipe');
        // } else {
        //     navigate('/');
        // }

        navigate('/createrecipe');
    };

    if (recipes === undefined) {
        return (<div><progress className="progress is-small is-primary" max="100">Loading</progress></div>)
    }

    return (
        <div>
            <div className="tabs">
                <ul>
                    {categories.map((category) => (
                        <li
                            key={category}
                            className={activeCategory === category ? 'is-active' : ''}
                            onClick={() => setActiveCategory(category)}
                        >
                            <a>{category}</a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="field">
                <p className="control has-icons-left">
                    <input className="input" type="search" placeholder="Search" />
                </p>
            </div>
            <button className="button is-primary" onClick={goToCreateRecipe}>
                + Create Recipe
            </button>

            <div className="columns is-multiline">
                {recipes
                    .filter((recipe) => activeCategory === 'All' || recipe.category.includes(activeCategory))
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