import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PlansPage = () => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(null);

    // Dummy data for plans
    const plans = {
        '4/26 Fri': {
            Breakfast: ['Chicken Salad', 'Waffle'],
            Lunch: ['Sandwich'],
            Dinner: ['Sandwich']
        },
        '4/27 Sat': {
            Breakfast: ['Chicken Salad', 'Waffle'],
            Lunch: ['Sandwich'],
            Dinner: ['Sandwich']
        },
        '4/29 Mon': {

        }
    };

    const handleSelectDate = (date) => {
        setSelectedDate(date);
    };

    return (
        <div className="columns">
            <div className="column is-one-fifth">
                {/* List of dates */}
                {Object.keys(plans).map((date) => (
                    <div key={date} className={`box ${selectedDate === date ? 'is-selected' : ''}`} onClick={() => handleSelectDate(date)}>
                        <p><strong>{date}</strong></p>
                        {Object.entries(plans[date]).map(([meal, recipes]) => (
                            <div key={meal}>
                                <p>{meal}:</p>
                                {recipes.map((recipe) => (
                                    <p key={recipe}>{recipe}</p>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="column">
                <h2 className="title is-3">Recipes</h2>
                <p>Recipes. Can be served as breakfast, lunch and dinner options, and also see recipe details</p>
            </div>
        </div>
    );
};

export default PlansPage;
