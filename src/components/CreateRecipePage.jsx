import React from 'react';

const CreateRecipePage = () => {
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
                        <label className="label">Tag</label>
                        <p className="control">
                            <button className="button">+ Add Tag</button>
                        </p>
                    </div>

                    <div className="field">
                        <label className="label">Recipe Picture</label>
                        <p className="control">
                            <button className="button">+ Add Photo</button>
                        </p>
                    </div>

                    <div className="field">
                        <label className="label">Ingredients</label>
                        <div className="field has-addons">
                            <p className="control">
                                <button className="button" >❌</button>
                            </p>
                            <p className="control">
                                <input className="input" type="text" placeholder="Item" />
                            </p>
                            <p className="control">
                                <input className="input" type="text" placeholder="Quantity" />
                            </p>
                        </div>

                        <button className="button" >+ Add ingredient</button>
                    </div>
                </div>

                <div className="column">
                    <div className="field">
                        <label className="label">Steps</label>
                        <div className="field">
                            <p className="control">
                                <input className="input" type="text" placeholder="Step 1" />
                            </p>
                        </div>
                        <div className="field">
                            <p className="control">
                                <input className="input" type="text" placeholder="Step 1" />
                            </p>
                        </div>
                        <button className="button" >+ Add Steps</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateRecipePage;
