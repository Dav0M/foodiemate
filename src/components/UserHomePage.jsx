import React, { useState } from 'react';

function UserHomePage() {
    // Dummy data for plans
    const plans = [
        { day: 'Today - Wed', meals: { breakfast: 'Waffles', lunch: 'Chicken Salad', dinner: '...' } },
        { day: 'Tomorrow - Thu', meals: { breakfast: '...', lunch: '...', dinner: '...' } },
        { day: 'Apr 29 - Mon', meals: { breakfast: '...', lunch: '...', dinner: '...' } },
    ];

    // Dummy data for shopping list
    const [shoppingList, setShoppingList] = useState([
        { item: 'egg', quantity: '1 dozen' },
        { item: 'tomato', quantity: '4' },
        { item: 'milk', quantity: '1' },
    ]);

    // State for showing add item form
    const [showAddItemForm, setShowAddItemForm] = useState(false);

    // Function to handle adding a new item to the shopping list
    const addItemToShoppingList = (e) => {
        e.preventDefault();
        const newItem = e.target.elements.item.value;
        const quantity = e.target.elements.quantity.value;
        if (newItem && quantity) {
            setShoppingList([...shoppingList, { item: newItem, quantity }]);
            setShowAddItemForm(false); // Hide form after adding an item
        }
    };

    // State for controlling the visibility of edit/delete options
    const [activeDropdown, setActiveDropdown] = useState(null);

    // Functions to handle edit and delete
    const handleEdit = (index) => {
        // Placeholder for edit functionality
        console.log(`Edit item at index ${index}`);
        setActiveDropdown(null); // Close dropdown after action
    };

    const handleDelete = (index) => {
        setShoppingList(shoppingList.filter((_, i) => i !== index));
        setActiveDropdown(null); // Close dropdown after action
    };

    return (
        <div className="container">
            {/* <h1 className="title">User home page</h1> */}
            <div className="columns">
                <div className="column">
                    <h2 className="title is-3">Plans</h2>
                    {plans.map((plan, index) => (
                        <div key={index} className="box">
                            <h3 className="is-size-5">{plan.day}</h3>
                            <p>Breakfast: {plan.meals.breakfast}</p>
                            <p>Lunch: {plan.meals.lunch}</p>
                            <p>Dinner: {plan.meals.dinner}</p>
                        </div>
                    ))}
                </div>
                <div className="column is-two-thirds">
                    <div className="is-flex is-justify-content-space-between">
                        <h2 className="title is-3">Shopping list</h2>
                        <button
                            className="button is-info is-light"
                            onClick={() => setShowAddItemForm(!showAddItemForm)}>
                            +
                        </button>
                    </div>
                    {shoppingList.map((item, index) => (
                        <div key={index} className="box">
                            <div className="level">
                                <div className="level-left">
                                    <div className="level-item">
                                        <div>
                                            <p className="is-size-5">{item.item}</p>
                                            <p>{item.quantity}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="level-right">
                                    <div className="level-item">
                                        <div className={`dropdown is-right ${activeDropdown === index ? 'is-active' : ''} is-hoverable`}>
                                            <div className="dropdown-trigger">
                                                <button className="button" aria-haspopup="true" aria-controls={`dropdown-menu-${index}`}>
                                                    <span>...</span>
                                                </button>
                                            </div>
                                            <div className="dropdown-menu" id={`dropdown-menu-${index}`} role="menu">
                                                <div className="dropdown-content">
                                                    <button className="button is-white dropdown-item" onClick={() => handleEdit(index)}>
                                                        Edit
                                                    </button>
                                                    <button className="button is-white dropdown-item" onClick={() => handleDelete(index)}>
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {showAddItemForm && (
                        <div className="box">
                            <form onSubmit={addItemToShoppingList}>
                                <div className="field is-grouped">
                                    <p className="control is-expanded">
                                        <input className="input" type="text" name="item" placeholder="Item" required />
                                    </p>
                                    <p className="control">
                                        <input className="input" type="text" name="quantity" placeholder="Quantity" required />
                                    </p>
                                    <p className="control">
                                        <button className="button is-info" type="submit">Add</button>
                                    </p>
                                    <p className="control">
                                        <button className="button" type="button" onClick={() => setShowAddItemForm(false)}>Cancel</button>
                                    </p>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserHomePage;
