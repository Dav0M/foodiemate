// import React from 'react';

// const CreateRecipePage = () => {
//     return (
//         <div className="container">
//             <h2 className="title is-3">Create</h2>
//             <div className="columns">
//                 <div className="column">
//                     <div className="field">
//                         <label className="label">Name</label>
//                         <div className="control">
//                             <input className="input" type="text" placeholder="Name" />
//                         </div>
//                     </div>

//                     <div className="field">
//                         <label className="label">Link</label>
//                         <div className="control">
//                             <input className="input" type="text" placeholder="Link" />
//                         </div>
//                     </div>

//                     <div className="field">
//                         <label className="label">Tag</label>
//                         <p className="control">
//                             <button className="button">+ Add Tag</button>
//                         </p>
//                     </div>

//                     <div className="field">
//                         <label className="label">Recipe Picture</label>
//                         <p className="control">
//                             <button className="button">+ Add Photo</button>
//                         </p>
//                     </div>

//                     <div className="field">
//                         <label className="label">Ingredients</label>
//                             <div className="field has-addons">
//                                 <p className="control">
//                                     <button className="button" >❌</button>
//                                 </p>
//                                 <p className="control">
//                                     <input className="input" type="text" placeholder="Item" />
//                                 </p>
//                                 <p className="control">
//                                     <input className="input" type="text" placeholder="Quantity" />
//                                 </p>
//                             </div>

//                         <button className="button" >+ Add ingredient</button>
//                     </div>
//                 </div>

//                 <div className="column">
//                     <div className="field">
//                         <label className="label">Steps</label>
//                         <div className="field">
//                             <p className="control">
//                                 <input className="input" type="text" placeholder="Step 1" />
//                             </p>
//                         </div>
//                         <div className="field">
//                             <p className="control">
//                                 <input className="input" type="text" placeholder="Step 1" />
//                             </p>
//                         </div>
//                         <button className="button" >+ Add Steps</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CreateRecipePage;



import React, { useState } from 'react';

const CreateRecipePage = () => {
    const [ingredients, setIngredients] = useState([{ id: 1, item: '', quantity: '' }]);
    const [steps, setSteps] = useState([{ id: 1, text: '' }]);

    const addIngredient = () => {
        setIngredients([...ingredients, { id: ingredients.length + 1, item: '', quantity: '' }]);
    };

    const removeIngredient = (id) => {
        setIngredients(ingredients.filter(ingredient => ingredient.id !== id));
    };

    const updateIngredient = (id, field, value) => {
        setIngredients(
            ingredients.map(ingredient => 
                ingredient.id === id ? { ...ingredient, [field]: value } : ingredient
            )
        );
    };

    const addStep = () => {
        setSteps([...steps, { id: steps.length + 1, text: '' }]);
    };

    const updateStep = (id, value) => {
        setSteps(
            steps.map(step => step.id === id ? { ...step, text: value } : step)
        );
    };

    return (
        <div className="container">
            <h2 className="title is-3">Create</h2>
            <div className="columns">
                <div className="column">
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="Name" />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Link</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="Link" />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Recipe Picture</label>
                        <p className="control">
                            <button className="button">+ Add Photo</button>
                        </p>
                    </div>

                    <div className="field">
                        <label className="label">Ingredients</label>
                        {ingredients.map((ingredient, index) => (
                            <div key={ingredient.id} className="field has-addons">
                                <p className="control">
                                    <button className="button" onClick={() => removeIngredient(ingredient.id)}>❌</button>
                                </p>
                                <p className="control">
                                    <input 
                                        className="input" 
                                        type="text" 
                                        placeholder="Item" 
                                        value={ingredient.item} 
                                        onChange={(e) => updateIngredient(ingredient.id, 'item', e.target.value)}
                                    />
                                </p>
                                <p className="control">
                                    <input 
                                        className="input" 
                                        type="text" 
                                        placeholder="Quantity" 
                                        value={ingredient.quantity}
                                        onChange={(e) => updateIngredient(ingredient.id, 'quantity', e.target.value)}
                                    />
                                </p>
                            </div>
                        ))}
                        <button className="button" onClick={addIngredient}>+ Add ingredient</button>
                    </div>
                </div>

                <div className="column">
                    <div className="field">
                        <label className="label">Steps</label>
                        {steps.map((step, index) => (
                            <div key={step.id} className="field">
                                <p className="control">
                                    <input 
                                        className="input" 
                                        type="text" 
                                        placeholder={`Step ${index + 1}`} 
                                        value={step.text}
                                        onChange={(e) => updateStep(step.id, e.target.value)}
                                    />
                                </p>
                            </div>
                        ))}
                        <button className="button" onClick={addStep}>+ Add Steps</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateRecipePage;