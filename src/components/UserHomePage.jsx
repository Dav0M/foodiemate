import React, { useState, useEffect } from 'react';
import backgroundImage from '../images/shoppinglist_background.jpeg';

function UserHomePage() {
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const initialPlans = weekDays.map(day => ({ day, meals: { breakfast: '...', lunch: '...', dinner: '...' } }));

    const [plans, setPlans] = useState(initialPlans);
    // const [plans, setPlans] = useState([
    //     { day: 'Mon', meals: { breakfast: 'Waffles', lunch: 'Chicken Salad', dinner: '...' } },
    //     { day: 'Thu', meals: { breakfast: '...', lunch: '...', dinner: '...' } },
    //     { day: 'Wed', meals: { breakfast: '...', lunch: '...', dinner: '...' } },
    // ]);
    const [shoppingList, setShoppingList] = useState();
    const [showAddItemForm, setShowAddItemForm] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [editItem, setEditItem] = useState(null);
    const [loading, setLoading] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPlan, setCurrentPlan] = useState(null);

    useEffect(() => {
        fetchShoppingList();
    }, []);

    const handleEditPlan = (plan) => {
        setCurrentPlan(plan);
        setIsModalOpen(true);
    };

    const handleDeletePlan = async (day) => {
        try {
            setLoading(true);
            const response = await fetch(`/api/deleteMealPlan/${day}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Failed to delete the plan');
            setPlans(plans.map(plan => plan.day === day ? { ...plan, meals: { breakfast: '...', lunch: '...', dinner: '...' } } : plan));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    //
    const fetchShoppingList = async () => {
        setLoading(true);
        const response = await fetch('/api/shopping-list');
        const data = await response.json();
        setShoppingList(data);
        setLoading(false);
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

    const handleEditItem = (item) => {
        setEditItem(item);
        setShowAddItemForm(true);
        setActiveDropdown(null);
    };

    const handleDeleteItem = async (id) => {
        const response = await fetch(`/api/shopping-list/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            setShoppingList(shoppingList.filter(item => item._id !== id));
            setActiveDropdown(null);
        }
    };

    if (shoppingList === undefined) {
        return (<div><progress className="progress is-small is-primary" max="100">Loading</progress></div>)
    }

    return (
        <section className="hero is-fullheight-with-navbar" style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5)), url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }}>
            <div className="container">
                <div className="columns">
                    <div className="column">
                        <h2 className="title is-3 has-text-centered-touch" style={{ marginTop: '1vw', marginLeft: '0.5rem' }}>Plans</h2>
                        <button className="button is-info" onClick={() => { }}>Add Plan</button>
                        {plans.map((plan, index) => (
                            <div key={index} className="box">
                                <h3 className="title is-4">{plan.day}</h3>
                                <p>Breakfast: {plan.meals.breakfast}</p>
                                <p>Lunch: {plan.meals.lunch}</p>
                                <p>Dinner: {plan.meals.dinner}</p>
                                <button onClick={() => handleEditPlan(plan.day)}>Edit</button>
                                <button onClick={() => handleDeletePlan(plan.day)}>Delete</button>
                            </div>
                        ))}
                    </div>
                    <div className="column">
                        <div className="is-flex is-justify-content-space-between">
                            <h2 className="title is-3 has-text-centered-touch" style={{ marginTop: '1vw', marginLeft: '0.5rem' }}>Shopping list</h2>
                            <button className="button is-info is-light"
                                style={{ marginLeft: 'auto', marginTop: '1vw', marginBottom: '1vw', marginRight: '0.5rem' }}
                                onClick={() => { setEditItem(null); setShowAddItemForm(true); }}>
                                ➕
                            </button>
                        </div>
                        {loading ? <progress className="progress is-small is-primary" max="100">Loading</progress> : (
                            <>
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
                                            <div className="box" style={{ margin: '0.5rem' }}>
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
                                                                        <button className="button is-white dropdown-item" onClick={() => handleEditItem(item)}>
                                                                            Edit
                                                                        </button>
                                                                        <button className="button is-white dropdown-item" onClick={() => handleDeleteItem(item._id)}>
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
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default UserHomePage;
