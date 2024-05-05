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



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import CloudinaryWidget from './CloudinaryWidget';

const CreateRecipePage = () => {
    const navigate = useNavigate();

    const [ingredients, setIngredients] = useState([{ id: 1, item: '', quantity: '' }]);
    const [steps, setSteps] = useState([{ id: 1, text: '' }]);
    const [ingredientsCount, setIngredientsCount] = useState(1);
    const [stepsCount, setStepsCount] = useState(1);

    const [name, setName] = useState("");
    // const [link, setLink] = useState("");

    // const [checkedTags, setCheckedTags] = useState([])
    // const checkedTags = [];

    const [checkedTags, setCheckedTags] = useState([]);
    const handleCheckboxChange = (tag, isChecked) => {
        if (isChecked) {
            setCheckedTags(prev => {
                if (!prev.includes(tag)) {
                    return [...prev, tag];
                }
                return prev;
            });
        } else {
            setCheckedTags(prev => prev.filter(t => t !== tag));
        }
        // console.log("CheckedTags: ", checkedTags);
    };

    const [tags, setTags] = useState([])

    const [imgInfo, setImgInfo] = useState({});
    const [cloudName] = useState("dzvggknvm");
    const [uploadPreset] = useState("ml_default");

    const [uwConfig] = useState({
        cloudName,
        uploadPreset,
        multiple: false,
    });

    const cld = new Cloudinary({ cloud: { cloudName } });

    const recipeImage = cld.image(imgInfo.public_id);

    const fetchDbAllTags = async () => {
        const response = await fetch('/api/tags');
        const data = await response.json();
        setTags(data.data);
    };
    useEffect(() => { fetchDbAllTags(); }, []);

    // console.log("db all tags:", tags);


    const addIngredient = () => {
        setIngredients([...ingredients, { id: ingredientsCount + 1, item: '', quantity: '' }]);
        setIngredientsCount(ingredientsCount + 1)
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
        setSteps([...steps, { id: stepsCount + 1, text: '' }]);
        setStepsCount(stepsCount + 1)
    };

    const updateStep = (id, value) => {
        setSteps(
            steps.map(step => step.id === id ? { ...step, text: value } : step)
        );
    };

    const removeStep = (id) => {
        setSteps(steps.filter(step => step.id !== id));
    };

    // const checkTag = (value) => {
    //     checkedTags.push(value);
    //     // setSteps([...checkedTags, { tag: stepsCount + 1, text: '' }]);
    //     // setStepsCount(stepsCount + 1)
    // };

    const submitRecipe = async () => {
        const stepsText = steps.map(s => s.text)
        const ingredientsData = ingredients.map((i) => { return { item: i.item, quantity: i.quantity } })
        const payload = {
            name: name,
            steps: stepsText,
            pictureUrl: imgInfo.url,
            ingredients: ingredientsData,
            tag: checkedTags
        }
        const res = await fetch('/api/createRecipe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (res.ok) {
            navigate('/recipehome')
        }
    };

    return (
        <div className="container">
            <h2 className="title is-3">Create</h2>
            <div className="columns">
                <div className="column">
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Tags</label>

                        <div className="control">

                            {tags.map((tag, index) => (

                                <label key={tag.id} class="checkbox" style={{ width: '160px' }}>
                                    <input type="checkbox" onChange={e => handleCheckboxChange(tag.tag, e.target.checked)} />
                                    {"     " + tag.tag}
                                </label>
                            ))}

                            {/* <input className="input" type="text" placeholder="Link" onChange={(e) => setLink(e.target.value)} /> */}
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Recipe Picture</label>
                        <p className="control">
                            <CloudinaryWidget uwConfig={uwConfig} setImgInfo={setImgInfo}></CloudinaryWidget>
                        </p>
                        <div style={{ width: "40%" }}>
                            <AdvancedImage
                                style={{ maxWidth: "100%" }}
                                cldImg={recipeImage}
                                plugins={[responsive(), placeholder()]}
                            />
                        </div>
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
                            <div key={step.id} className="field has-addons">
                                <p className="control">
                                    <button className="button" onClick={() => removeStep(step.id)}>❌</button>
                                </p>
                                <p className="control is-expanded">
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
            <div className='has-text-centered'>
                <button className='button is-success' onClick={() => submitRecipe()}>Finish</button>
            </div>
        </div>
    );
};

export default CreateRecipePage;