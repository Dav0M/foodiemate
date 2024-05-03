import React, { useState, useEffect } from 'react';

function UserHomePage() {
    const [plans, setPlans] = useState([
        { day: 'Today - Wed', meals: { breakfast: 'Waffles', lunch: 'Chicken Salad', dinner: '...' } },
        { day: 'Tomorrow - Thu', meals: { breakfast: '...', lunch: '...', dinner: '...' } },
        { day: 'Apr 29 - Mon', meals: { breakfast: '...', lunch: '...', dinner: '...' } },
    ]);
    const [shoppingList, setShoppingList] = useState([]);
    const [showAddItemForm, setShowAddItemForm] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [editItem, setEditItem] = useState(null);

    useEffect(() => {
        fetchShoppingList();
    }, []);

    const fetchShoppingList = async () => {
        const response = await fetch('/api/shopping-list');
        const data = await response.json();
        setShoppingList(data);
    };

    const handleAddOrUpdateItem = async (e) => {
        e.preventDefault();
        const item = e.target.item.value;
        const quantity = e.target.quantity.value;

        if (editItem) {
            // Update existing item
            const response = await fetch(`/api/shopping-list/${editItem._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ item, quantity })
            });
            if (response.ok) {
                fetchShoppingList();
                setEditItem(null);
            }
        } else {
            // Add new item
            const response = await fetch('/api/shopping-list', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ item, quantity })
            });
            if (response.ok) {
                const newItem = await response.json();
                setShoppingList([...shoppingList, newItem]);
            }
        }
        setShowAddItemForm(false);
    };

    const handleEdit = (item) => {
        setEditItem(item);
        setShowAddItemForm(true);
        setActiveDropdown(null);
    };

    const handleDelete = async (id) => {
        const response = await fetch(`/api/shopping-list/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            setShoppingList(shoppingList.filter(item => item._id !== id));
            setActiveDropdown(null);
        }
    };

    return (
        <div className="container">
            <div className="columns">
                <div className="column">
                    <h2 className="title is-3">Plans</h2>
                    {plans.map((plan, index) => (
                        <div key={index} className="box">
                            <h3>{plan.day}</h3>
                            <p>Breakfast: {plan.meals.breakfast}</p>
                            <p>Lunch: {plan.meals.lunch}</p>
                            <p>Dinner: {plan.meals.dinner}</p>
                        </div>
                    ))}
                </div>
                <div className="column">
                    <div className="is-flex is-justify-content-space-between">
                        <h2 className="title is-3">Shopping list</h2>
                        <button className="button is-info is-light"
                            style={{ marginLeft: 'auto', marginTop: '1vw', marginBottom: '1vw' }}
                            onClick={() => { setEditItem(null); setShowAddItemForm(true); }}>
                            ➕
                        </button>
                    </div>
                    {showAddItemForm && (
                        <div className="box">
                            <form onSubmit={handleAddOrUpdateItem}>
                                <div className="field is-grouped">
                                    <p className="control is-expanded">
                                        <input className="input" type="text" name="item" defaultValue={editItem ? editItem.item : ''} placeholder="Item" required />
                                    </p>
                                    <p className="control is-expanded">
                                        <input className="input" type="text" name="quantity" defaultValue={editItem ? editItem.quantity : ''} placeholder="Quantity" required />
                                    </p>
                                    <p className="control">
                                        <button className="button is-success" type="submit">{editItem ? 'Update' : 'Add'}</button>
                                    </p>
                                    <p className="control">
                                        <button className="button is-light" type="button" onClick={() => { setEditItem(null); setShowAddItemForm(false); }}>Cancel</button>
                                    </p>
                                </div>
                            </form>
                        </div>
                    )}
                    <div className="columns is-multiline">
                        {shoppingList.map((item, index) => (
                            <div key={index} className="column is-half">
                                <div className="box">
                                    <div className="level">
                                        <div className="level-left">
                                            <div className="level-item">
                                                <div style={{ flexGrow: 1, maxWidth: '12vw', textOverflow: 'ellipsis' }}>
                                                    <p><strong>{item.item}</strong></p>
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
                                                            <button className="button is-white dropdown-item" onClick={() => handleEdit(item)}>
                                                                Edit
                                                            </button>
                                                            <button className="button is-white dropdown-item" onClick={() => handleDelete(item._id)}>
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserHomePage;
