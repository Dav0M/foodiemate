import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../recipes.css';
// import RecipeDisplay from './RecipeDisplay';

// function RecipeDisplay({ recipes, givenId }) {
//     // Find the recipe in the list that matches the given ID
//     const matchingRecipe = recipes.find(recipe => recipe._id === givenId);
//     console.log("recipes: ", givenId);
//     console.log("givenId: ", givenId);

//     // Render the matching recipe's name if it exists
//     return (
//         <div>
//             {matchingRecipe ? (
//                 <p>{matchingRecipe.name}</p>
//             ) : (
//                 <p>No matching recipe found.</p>
//             )}
//         </div>
//     );
// };

const PlansPage = () => {
    const navigate = useNavigate();
    // const date = new Date();
    // const today = date.getDate();
    // console.log(date);
    // console.log(date + 7);


    // function formatDate(date) {
    //     const d = new Date(date);
    //     const year = d.getFullYear();
    //     const month = ('0' + (d.getMonth() + 1)).slice(-2); // 月份从0开始，所以加1
    //     const day = ('0' + d.getDate()).slice(-2);
    //     const hour = ('0' + d.getHours()).slice(-2);
    //     const minute = ('0' + d.getMinutes()).slice(-2);

    //     return `${year}-${month}-${day} ${hour}:${minute}`;
    // }

    // const [sevenDays, setSevenDays] = useState([]);
    const [shouldFetch, setShouldFetch] = useState(true);
    const [sevenDays, setSevenDays] = useState([]);

    const [breakfastRecipe, updateBreakfastRecipe] = useState(null);
    const [lunchRecipe, updateLunchRecipe] = useState(null);
    const [dinnerRecipe, updateDinnerRecipe] = useState(null);
    const [reload, setReload] = useState(false);

    const buttonRef = useRef(null);

    function fresh() {
        navigate('/plans');
    }

    const oneDayTime = 24 * 60 * 60 * 1000;
    const now = new Date();
    const nowTime = now.getTime(); //+83

    // useEffect(() => { get7Days() }, []);

    ///////////// form 7 days
    const get7Days = () => {

        for (let i = 0; i < 15; i++) {
            const ShowTime = nowTime + i * oneDayTime;
            const myDate = new Date(ShowTime);
            // const year = myDate.getFullYear().toString();
            // const month = (myDate.getMonth() + 1).toString();
            // const date = myDate.getDate().toString();

            // function addzero(dstr) {
            //     if (dstr.length !== 2) {
            //         return "0" + dstr;
            //     }
            //     else { return dstr; }
            // };
            // const save_date = year + "-" + addzero(month) + "-" + addzero(date);
            const save_date = myDate.toISOString().split('T')[0];

            // console.log(year + "-" + addzero(month) + "-" + addzero(date));
            // setSevenDays(prev => {
            //     if (!prev.includes(save_date)) {
            //         return [...prev, save_date];
            //     }
            //     return prev;
            // });
            if (!sevenDays.includes(save_date)) {
                sevenDays.push(save_date);
            }

            // var str = "星期" + "日一二三四五六".charAt(myDate.getDay());
            // console.log(sevenDays);
        }
        // console.log(sevenDays);
    };
    /////////// test 7 dates printing 

    const [mealplans, setMealplans] = useState([]);
    const [validPlans, setValidPlans] = useState([]);
    // const fetchMealplans = async () => {
    //     const response = await fetch('/api/mealplans');
    //     const data = await response.json();
    //     setMealplans(data.data);
    // };



    // get7Days();



    const [recipes, setRecipes] = useState();
    const [shouldFetchRecipe, setShouldFetchRecipe] = useState(true);

    // const fetchRecipes = async () => {
    //     if (shouldFetchRecipe) {
    //         const response = await fetch('/api/recipes');
    //         const data = await response.json();
    //         // setRecipes(data.data);
    //         // setShouldFetchRecipe(false);

    //         // fetch('/api/recipes')
    //         //     .then(response => {
    //         //         if (!response.ok) throw new Error('Network response was not ok.');
    //         //         return response.json();
    //         //     })
    //         //     .then(data => {
    //         //         setRecipes(data.data);
    //         //         setShouldFetchRecipe(false);
    //         //     });
    //     };
    // };
    // useEffect(() => { fetchRecipes() }, [shouldFetchRecipe]);


    // const fetchUnexistDays = async () => {

    //     const response = await fetch('/api/checkdefault7days');
    //     const data = await response.json();
    //     console.log("data: ", Object.values(data)[0]);
    //     const unexistdates = [];
    //     if (Object.values(data)[0].length !== 0) {
    //         unexistdates = data.results[0].date;
    //     };

    // const fetchUnexistDays = () => {
    //     let unexistdates = [];

    //     if (shouldFetch) {
    //         // setShouldFetch(false);
    //         fetch('/api/checkdefault7days')
    //             .then(response => {
    //                 if (!response.ok) throw new Error('Network response was not ok.');
    //                 return response.json();
    //             })
    //             .then(data => {
    //                 // const unexistdates = data.results.map(result => result.date);
    //                 // console.log("Dates that do not exist:", unexistdates);

    //                 const temp = Object.values(data)[0];
    //                 console.log("data: ", temp.length);
    //                 setShouldFetch(false);

    //                 if (Object.values(data)[0].length !== 0) {
    //                     unexistdates = data.results[0].date;
    //                 };
    //                 // setMealplans(data.data);
    //                 if (unexistdates.length !== 0) {
    //                     fetch('/api/createdefault7days', {
    //                         method: 'POST',
    //                         headers: { 'Content-Type': 'application/json' },
    //                         body: JSON.stringify({ day_list: unexistdates })

    //                     })
    //                         .then(response => response.json())
    //                     // .then(data => {
    //                     // console.log('Response from server:', data.results[0].date.length, data.results[0].status);
    //                     // if (data.results[0].date.length === 7 && data.results[0].status === "exists") {
    //                     // fetchMealplans();
    //                     // };
    //                     // })
    //                 }
    //                 // else {
    //                 // fetchMealplans();
    //                 // const response = await fetch('/api/mealplans');
    //                 // const data = await response.json();
    //                 // setMealplans(data.data);
    //                 // };
    //             })
    //             .then(fetchMealplans())
    //             .catch(error => {
    //                 console.error('Fetch error:', error);
    //             });
    //     }

    // };

    const [dataFromDB1, setDataFromDB1] = useState(null);
    const [dataFromDB2, setDataFromDB2] = useState(null);
    const [dataFromDB3, setDataFromDB3] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [recipesDictionary, setRecipesDictionary] = useState(null);

    // const [validPlans, setValidPlans] = useState([]);


    // useEffect(() => {
    const fetchData = async () => {

        if (shouldFetch) {
            get7Days();

            try {

                // Fetch from the first database
                const db4Data = await fetch('/api/recipes').then(res => {
                    if (!res.ok) throw new Error('Failed to fetch from database 4');
                    return res.json();
                })
                    .then(data => {
                        setRecipes(data.data);
                        // const recipesDictionary = data.data.reduce((dict, recipe) => {
                        //     dict[recipe._id] = {
                        //         name: recipe.name,
                        //         steps: recipe.steps,
                        //         pictureUrl: recipe.pictureUrl,
                        //         ingredients: recipe.ingredients,
                        //         tag: recipe.tag,
                        //     };
                        //     return dict;
                        // }, {});
                        // return recipesDictionary;
                    });
                // setRecipesDictionary(db4Data);

                const db1Data = await fetch('/api/checkdefault7days')
                    .then(response => {
                        if (!response.ok) throw new Error('1 Network response was not ok.');
                        return response.json();
                    });
                setDataFromDB1(db1Data);
                // setShouldFetch(false);

                let unexistdates = [];
                let db2Data = null;
                const temp = Object.values(db1Data)[0];
                // console.log("data: ", temp.length);
                // console.log("db1Data.results: ", db1Data.results);
                // setShouldFetch(false);

                if (temp.length !== 0) {
                    // unexistdates = db1Data.results[0].date;
                    const unexistdates = db1Data.results.map(dateDict => dateDict.date);
                    // console.log("unexistdates: ", unexistdates);
                    if (unexistdates.length !== 0) {
                        db2Data = await fetch('/api/createdefault7days', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ day_list: unexistdates })

                        })
                            .then(response => {
                                if (!response.ok) throw new Error('2 Network response was not ok.');
                                return response.json();
                            });

                        setDataFromDB2(db2Data);
                        // console.log("db2Data: ", db2Data.results);
                    }
                };
                // console.log("unexistdates out: ", unexistdates);
                // setMealplans(data.data);


                // Fetch from the third database, might depend on second fetch
                const db3Data = await fetch('/api/mealplans').then(res => {
                    if (!res.ok) throw new Error('Failed to fetch from database 3');
                    return res.json();
                }).then(data => {
                    const valid_data = data.data.filter(mealplan => sevenDays.includes(mealplan.date));
                    setValidPlans(valid_data);
                    return valid_data;
                });
                // .then(data => {
                //     return data.map(plan => ({
                //         [plan.date]: [
                //             plan.meals.breakfast,
                //             plan.meals.lunch,
                //             plan.meals.dinner
                //         ]
                //     }));
                // });
                setDataFromDB3(db3Data);
                // setMealplans(db3Data.data);
                // console.log(db3Data);

                // setValidPlans(db3Data);

                // .then(data => {
                //     // console.log(data);
                //     return data.map(plan => ({
                //         ...plan,
                //         meals: {
                //             breakfast: recipes.find(recipe => recipe._id === plan.meals.breakfast),
                //             lunch: recipes.find(recipe => recipe._id === plan.meals.lunch),
                //             dinner: recipes.find(recipe => recipe._id === plan.meals.dinner)
                //         }
                //     }));
                // });

                // const db5Data = await fetch('/api/recipe/' + ).then(res => {
                //     if (!res.ok) throw new Error('Failed to fetch from database 4');
                //     return res.json();
                // })
                //     .then(data => {
                //         // setRecipes(data.data);
                //     });




            }
            catch (error) {
                if (error.message.includes("1 Network response was not ok")) {
                    // Log and ignore
                    console.log("Ignoring specific error:", error);
                } else {
                    setError(error); // Re-throw errors that are not to be ignored
                }

            } finally {
                setLoading(false);
                // setShouldFetch(false);
            }

        }
    };

    useEffect(() => { fetchData() }, [reload]);

    // fetchData();
    // const valid = mealplans.filter(mealplan => sevenDays.includes(mealplan.date));
    // setValidPlans(valid);
    // console.log(sevenDays);
    // console.log("mealplans: ", mealplans);
    // console.log("valid plans: ", validPlans);
    // console.log("recipes:", recipes);
    // console.log("recipesDictionary:", recipesDictionary);

    // console.log("Recipe Details:", recipesDictionary["663801645f1ded112f281ec8"]);
    // const recipeId = "663801645f1ded112f281ec8";
    // const recipeDetails = recipesDictionary[recipeId];
    // console.log("Recipe Details:", recipeDetails);

    // }, []);



    // const makeup7Days = () => {
    //     // const payload = { todoid: null, summary: newTodo, createtime: new Date(), isDone: false, category: "Undefined", userid: null };
    //     // get7Days();
    //     console.log("sevenDays: ", sevenDays);
    //     fetch('/api/createdefault7days', {
    //         method: 'GET',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ day_list: sevenDays })

    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log('Response from server:', data.results[0].date.length, data.results[0].status);
    //             if (data.results[0].date.length === 7 && data.results[0].status === "exists") {
    //                 fetchMealplans();
    //             };
    //         })

    // };

    // useEffect(() => { fetchUnexistDays() }, [shouldFetch]);
    // useEffect(() => { makeup7Days() }, []);
    // useEffect(() => { fetchMealplans(); }, []);
    // console.log("mealplans: ", mealplans);

    // const validPlans = mealplans.filter(mealplan => sevenDays.includes(mealplan.date));
    // console.log(sevenDays);
    // console.log("valid plans: ", validPlans);
    // console.log("recipes:", recipes);
    // const recipesDictionary = recipes.map((dict, recipe) => {
    //     dict[recipe._id] = {
    //         name: recipe.name,
    //         steps: recipe.steps,
    //         pictureUrl: recipe.pictureUrl,
    //         ingredients: recipe.ingredients,
    //         tag: recipe.tag,
    //     };
    //     return dict;
    // }, {});

    // const recipeId = "663801645f1ded112f281ec8";
    // const recipeDetails = recipesDictionary[recipeId];
    // console.log("Recipe Details:", recipeDetails);
    // console.log("Recipe Details:", recipesDictionary["663801645f1ded112f281ec8"]);

    // const getRecipeNameById = (recipeId) => {
    //     console.log("Recipe id type:", typeof recipeId);
    //     const recipe = recipes.find(recipe => recipe._id === recipeId);
    //     if (recipe) {
    //         return recipe.name;
    //     } else {
    //         return 'No recipe found with that ID.';
    //     }
    // }

    const [selectedDate, setSelectedDate] = useState(null);
    const [todayMealIDs, setTodayMealIds] = useState([]);
    const [selectedBreakfast, setSelectedBreakfast] = useState([]);
    const [selectedLunch, setSelectedLunch] = useState([]);
    const [selectedDinner, setSelectedDinner] = useState([]);
    // console.log(sevenDays);
    // console.log("mealplans: ", mealplans);
    // console.log("valid plans: ", validPlans);
    // console.log("recipes:", recipes);
    // console.log("recipesDictionary:", recipesDictionary);
    // console.log("recipesDictionary:", recipesDictionary["6636aa4652b6969f66c1d370"]);



    const handleSelectDate = (date, breakfast, lunch, dinner) => {
        setSelectedDate(date);
        setTodayMealIds([breakfast, lunch, dinner]);
        setSelectedBreakfast([breakfast]);
        setSelectedLunch([lunch]);
        setSelectedDinner([dinner]);
        // setSelectedDate([dinner]);
        // todayMealIDs.push({ date: oneday });
        // setSelectedBreakfast(recipes.find(recipe => recipe._id === breakfast));
        // setSelectedLunch(lunch);
        // setSelectedDinner(dinner);

        // {recipes.find(recipe => recipe._id === breakfast).name}
        // console.log("selectedBreakfast: ", selectedBreakfast);
        // console.log("todayMealIds: ", todayMealIDs);

    };

    if (loading) return (<div><progress className="progress is-small is-primary" max="100">Loading</progress></div>)
    if (error) return <p>Error loading data: {error.message}</p>;



    const handleChangeBreakfast = async () => {
        // const id = todo._id;

        let payload = { date: selectedDate, meals: {} };
        // if (breakfastRecipe !== null) {
        payload.meals.breakfast = breakfastRecipe;
        // };
        // if (lunchRecipe !== null) {
        //     payload.meals.lunch = lunchRecipe;
        // };
        // if (dinnerRecipe !== null) {
        //     payload.meals.dinner = dinnerRecipe;
        // };

        const response = await fetch(`/api/update/mealplan`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await response.json();

        if (response.status === 200) {
            console.log('Success:', data.message);

            setReload(prev => !prev);
            // fresh();
            // buttonRef.current.click();

            // window.location.reload();
            setSelectedBreakfast([data.message.meals.breakfast]);
            // setSelectedLunch([null]);
            // setSelectedDinner([null]);
            // handleSelectDate(data.message.date, data.message.meals.breakfast, data.message.meals.lunch, data.message.meals.dinner);

            // const fechreci = async () => {
            //     const db4Data = await fetch('/api/recipes').then(res => {
            //         if (!res.ok) throw new Error('Failed to fetch from database 4');
            //         return res.json();
            //     }).then(data => {
            //         setRecipes(data.data);
            //     });
            // };
            // fechreci();
            // alert('Meal plan updated successfully!');
        } else {
            console.error('Error:', data.error);
            // alert(`Failed to update meal plan: ${data.error}`);
        };
        // .then(response => {
        //     if (!response.ok) {
        //         throw new Error('HTTP error. status = ', response.status);
        //     }
        //     return response.json();
        // })
        // .then(data => {
        // console.log('Update successful:', data);
        // updateBreakfastRecipe(null);
        // updateLunchRecipe(null);
        // updateDinnerRecipe(null);
        // fresh();
        // handleSelectDate(selectedDate, null, null, null);
        // window.location.reload();
        // fetchData();
        // })
        // .catch(error => {
        // console.error('Failed to change recipe:', error);
        // setError('Failed to change recipe');
        // })

    };


    const handleChangeLunch = async () => {

        let payload = { date: selectedDate, meals: {} };
        payload.meals.lunch = lunchRecipe;
        // if (dinnerRecipe !== null) {
        //     payload.meals.dinner = dinnerRecipe;
        // };

        const response = await fetch(`/api/update/mealplan`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await response.json();

        if (response.status === 200) {
            console.log('Success:', data.message);

            setReload(prev => !prev);
            setSelectedLunch([data.message.meals.lunch]);
            // setSelectedDinner([null]);
            // handleSelectDate(data.message.date, data.message.meals.breakfast, data.message.meals.lunch, data.message.meals.dinner);
        } else {
            console.error('Error:', data.error);
            // alert(`Failed to update meal plan: ${data.error}`);
        };
    };

    const handleChangeDinner = async () => {

        let payload = { date: selectedDate, meals: {} };
        payload.meals.dinner = dinnerRecipe;

        const response = await fetch(`/api/update/mealplan`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await response.json();

        if (response.status === 200) {
            console.log('Success:', data.message);

            setReload(prev => !prev);
            setSelectedDinner([data.message.meals.dinner]);
            // handleSelectDate(data.message.date, data.message.meals.breakfast, data.message.meals.lunch, data.message.meals.dinner);
        } else {
            console.error('Error:', data.error);
            // alert(`Failed to update meal plan: ${data.error}`);
        };
    };

    return (
        <div className="columns">
            {/* <div className="column is-1"></div> */}
            <div className="column is-one-fifth" style={{ overflowY: 'auto', height: '788px' }}>
                {/* List of dates */}
                {/* {Object.keys(plans).map((date) => (
                    // <div key={date} className={`box ${selectedDate === date ? 'is-selected' : ''}`} onClick={() => handleSelectDate(date)}>
                    <div key={date} className={`box ${selectedDate === date ? 'is-selected' : ''}`} >
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
                ))} */}

                {validPlans.map((plan, index) => (
                    // <div key={date} className={`box ${selectedDate === date ? 'is-selected' : ''}`} onClick={() => handleSelectDate(date)}>
                    <div key={plan.id} className={`box ${selectedDate === plan.date ? 'is-selected' : ''}`} ref={buttonRef} onClick={() => handleSelectDate(plan.date, plan.meals.breakfast, plan.meals.lunch, plan.meals.dinner)}>
                        <h3><strong>{plan.date}</strong></h3>
                        <div key="breakfast">
                            <div className="columns is-multiline">
                                <div className="column is-one-third" key="breakfast"><i><strong>Breakfast:</strong></i></div>
                                {/* <RecipeDisplay recipes={recipes} givenId={plan.meals.breakfast} /> */}
                                {/* {plan.meals.breakfast} */}
                                <div className="column is-two-thrids" key="breakfastplan">
                                    {plan.meals.breakfast === null ? <p>No plan</p> :
                                        <p>{recipes.find(recipe => recipe._id === plan.meals.breakfast)?.name}</p>}
                                </div>
                            </div>
                        </div>

                        <div key="lunch">
                            <div className="columns is-multiline">
                                <div className="column is-one-third" key="lunch"><i><strong>Lunch:</strong></i></div>
                                <div className="column is-two-thrids" key="lunchplan">
                                    {plan.meals.lunch === null ? <p>No plan</p> :
                                        <p>{recipes.find(recipe => recipe._id === plan.meals.lunch)?.name}</p>}
                                </div>
                            </div>
                        </div>

                        <div key="dinner">
                            <div className="columns is-multiline">
                                <div className="column is-one-third" key="dinner"><i><strong>Dinner:</strong></i></div>
                                <div className="column is-two-thrids" key="dinnerplan">
                                    {plan.meals.dinner === null ? <p>No plan</p> :
                                        <p>{recipes.find(recipe => recipe._id === plan.meals.dinner)?.name}</p>}
                                </div>
                            </div>
                        </div>
                        {/* {Object.entries(plan.meals).map(([meal, recipes]) => (
                            <div key={meal}>
                                <p>{meal}:</p>
                                {recipes.map((recipe) => (
                                    <p key={recipe}>{recipe}</p>
                                ))}
                            </div>
                        ))} */}
                    </div>
                ))}

            </div>
            <div className="column recipe-selections">

                <h2 className="title is-3">Meal Plans with Recipes</h2>

                {selectedDate ? (
                    <div>
                        <h2>Selected Date: {selectedDate}</h2>
                        <div className="columns is-multiline">
                            {selectedBreakfast[0] === null ?
                                (<div className="column is-one-third" key="recipeBreakfast">
                                    <h3><strong>Breakfast:</strong></h3>
                                    <p>No plan</p>
                                    <div class="content">
                                        <p>Please choose a recipe for this meal using the dropdown below:</p>
                                    </div>

                                    <div>
                                        {recipes.length > 0 && (
                                            <div class="columns">
                                                <div class="column is-8">
                                                    <div class="select-save-container">
                                                        <div class="select is-primary is-small">
                                                            <select id="recipe-select" onChange={e => updateBreakfastRecipe(e.target.value)}>
                                                                {recipes.map((rec) => (
                                                                    <option key={rec._id} value={rec._id}>
                                                                        {rec.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <button class='button is-primary is-outlined is-small save' onClick={handleChangeBreakfast}>Save</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                </div>) :
                                (recipes
                                    .filter((recipe) => selectedBreakfast.includes(recipe._id))
                                    .map((recipe) => (
                                        <div className="column is-one-third" key={recipe._id}>
                                            <h3><strong>Breakfast:</strong></h3>
                                            <div className="card">
                                                <div className="card-image">
                                                    <figure className="image is-4by3">
                                                        <img src={recipe.pictureUrl} alt={recipe.name} onClick={() => navigate('/aboutrecipe/' + recipe._id)} />
                                                    </figure>
                                                </div>
                                                <div className="card-content">
                                                    {/* <p className="title is-5 has-text-centered">{recipe.name}</p> */}
                                                    <div class="column is-12">
                                                        <div class="select is-primary">
                                                            <select id="recipe-select" className="title has-text-centered" defaultValue={selectedBreakfast} onChange={e => updateBreakfastRecipe(e.target.value)}>

                                                                {recipes.map((rec) => (
                                                                    <option key={rec._id} value={rec._id} selected={selectedBreakfast === rec._id}>
                                                                        {rec.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div class="column is-12" style={{ "textAlign": "center" }}>
                                                            <button class='button is-primary is-outlined is-small' onClick={handleChangeBreakfast}>Update</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* <div>
                                                {recipes.length > 0 && (
                                                    <div class="columns">
                                                        <div class="column is-8">
                                                            <div class="select is-primary is-small">
                                                                <select id="recipe-select" defaultValue={selectedBreakfast} onChange={e => updateBreakfastRecipe(e.target.value)}>

                                                                    {recipes.map((rec) => (
                                                                        <option key={rec._id} value={rec._id} selected={selectedBreakfast === rec._id}>
                                                                            {rec.name}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="column is-3">
                                                            <button class='button is-primary is-outlined is-small' onClick={handleChangeBreakfast}>Update</button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div> */}
                                        </div>
                                    )))}
                            {selectedLunch[0] === null ?
                                (<div className="column is-one-third" key="recipeLunch">
                                    <h3><strong>Lunch:</strong></h3>
                                    <p>No plan</p>
                                    <div class="content">
                                        <p>Please choose a recipe for this meal using the dropdown below:</p>
                                    </div>

                                    <div>
                                    {recipes.length > 0 && (
                                        <div class="columns">
                                            <div class="column is-8">
                                                <div class="select-save-container">
                                                    <div class="select is-primary is-small">
                                                        <select id="recipe-select" onChange={e => updateLunchRecipe(e.target.value)}>
                                                            {recipes.map((rec) => (
                                                                <option key={rec._id} value={rec._id}>
                                                                    {rec.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <button class='button is-primary is-outlined is-small save' onClick={handleChangeLunch}>Save</button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    </div>
                                </div>
                                ) :
                                (recipes
                                    .filter((recipe) => selectedLunch.includes(recipe._id))
                                    .map((recipe) => (
                                        <div className="column is-one-third" key={recipe._id}>
                                            <h3><strong>Lunch:</strong></h3>
                                            <div className="card">
                                                <div className="card-image">
                                                    <figure className="image is-4by3">
                                                        <img src={recipe.pictureUrl} alt={recipe.name} onClick={() => navigate('/aboutrecipe/' + recipe._id)} />
                                                    </figure>
                                                </div>
                                                <div className="card-content">
                                                    {/* <p className="title is-5 has-text-centered">{recipe.name}</p> */}
                                                    <div class="column is-12">
                                                        <div class="select is-primary">
                                                            <select id="recipe-select" className="title has-text-centered" defaultValue={selectedLunch} onChange={e => updateLunchRecipe(e.target.value)}>

                                                                {recipes.map((rec) => (
                                                                    <option key={rec._id} value={rec._id} selected={selectedLunch === rec._id}>
                                                                        {rec.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div class="column is-12" style={{ "textAlign": "center" }}>
                                                            <button class='button is-primary is-outlined is-small' onClick={handleChangeLunch}>Update</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    )))}
                            {selectedDinner[0] === null ?
                                (<div className="column is-one-third" key="recipeDinner">
                                    <h3><strong>Dinner:</strong></h3>
                                    <p>No plan</p>
                                    <div class="content">
                                        <p>Please choose a recipe for this meal using the dropdown below:</p>
                                    </div>

                                    <div>
                                    {recipes.length > 0 && (
                                        <div class="columns">
                                            <div class="column is-8">
                                                <div class="select-save-container">
                                                    <div class="select is-primary is-small">
                                                        <select id="recipe-select" onChange={e => updateDinnerRecipe(e.target.value)}>
                                                            {recipes.map((rec) => (
                                                                <option key={rec._id} value={rec._id}>
                                                                    {rec.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <button class='button is-primary is-outlined is-small save' onClick={handleChangeDinner}>Save</button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    </div></div>) :
                                (recipes
                                    .filter((recipe) => selectedDinner.includes(recipe._id))
                                    .map((recipe) => (
                                        <div className="column is-one-third" key={recipe._id}>
                                            <h3><strong>Dinner:</strong></h3>
                                            <div className="card">
                                                <div className="card-image">
                                                    <figure className="image is-4by3">
                                                        <img src={recipe.pictureUrl} alt={recipe.name} onClick={() => navigate('/aboutrecipe/' + recipe._id)} />
                                                    </figure>
                                                </div>
                                                <div className="card-content">
                                                    {/* <p className="title is-5 has-text-centered">{recipe.name}</p> */}
                                                    <div class="column is-12">
                                                        <div class="select is-primary">
                                                            <select id="recipe-select" className="title has-text-centered" defaultValue={selectedDinner} onChange={e => updateDinnerRecipe(e.target.value)}>

                                                                {recipes.map((rec) => (
                                                                    <option key={rec._id} value={rec._id} selected={selectedDinner === rec._id}>
                                                                        {rec.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div class="column is-12" style={{ "textAlign": "center" }}>
                                                            <button class='button is-primary is-outlined is-small' onClick={handleChangeDinner}>Update</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    )))}
                        </div>
                    </div>
                ) : (
                    <div>
                        <h2>No Date Selected -- Please select a date in the left.</h2>
                    </div>
                )
                }
                {/* <p>Recipes. Can be served as breakfast, lunch and dinner options, and also see recipe details</p> */}
                {/* <div style={{ width: '70%', padding: '20px' }}> */}
                {/* Display area for content based on selection */}
                {/* {contents[selectedContent]} */}
                {/* </div> */}


                {/* {recipes
                        .filter((recipe) => todayMealIDs.includes(recipe._id))
                        .map((recipe) => (
                            <div className="column is-one-third" key={recipe._id}>
                                <div className="card">
                                    <div className="card-image">
                                        <figure className="image is-4by3">
                                            <img src={recipe.pictureUrl} alt={recipe.name} onClick={() => navigate('/aboutrecipe/' + recipe._id)} />
                                        </figure>
                                    </div>
                                    <div className="card-content">
                                        <p className="title is-5 has-text-centered">{recipe.name}</p>
                                    </div>
                                </div>
                            </div>
                        ))} */}

            </div >


        </div >
    );
};

export default PlansPage;
