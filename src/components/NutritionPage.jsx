import React, { useState } from 'react';
import axios from 'axios';
import '../NutritionPage.css';

const NutritionPage = () => {
  const [food, setFood] = useState('');
  const [nutritionData, setNutritionData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setFood(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get('https://api.edamam.com/api/nutrition-data', {
        params: {
          app_id: '9425875b',
          app_key: '6b37f310df8123582deb31e3d771caaa',
          ingr: food
        }
      });
      setNutritionData(response.data);
    } catch (error) {
      console.error('Error fetching nutrition data:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderNutritionData = () => {
    if (!nutritionData || !nutritionData.ingredients) return null;

    const foodError = nutritionData.ingredients.some(ingredient => {
      return typeof (ingredient.parsed) === "undefined";
    });

    const quantityError = nutritionData.ingredients.some(ingredient => {
      const parsed = ingredient.parsed ? ingredient.parsed[0] : null;
      return parsed && parsed.status === 'MISSING_QUANTITY';
    });

    if (foodError || quantityError) {
      let errorMessage;
      if (foodError) {
        errorMessage = "We cannot find the item in our database, please try another one!";
      } else {
        errorMessage = "Missing quantity or measure, please enter the item like this: 1 egg, 1 cup milk.";
      }
      return (
        <div className="error-message">
          {errorMessage}
        </div>
      );
    }


    return (
      <div className="nutrition-facts">
        <table className="nutrition-table">
          <thead>
            <tr>
              <th>Qty</th>
              <th>Unit</th>
              <th>Food</th>
              <th>Calories</th>
              <th>Weight</th>
            </tr>
          </thead>
          <tbody>
            {nutritionData.ingredients.map((ingredient, index) => {
              const parsed = ingredient.parsed[0];
              return (
                <tr key={index}>
                  <td>{parsed.quantity}</td>
                  <td>{parsed.measure}</td>
                  <td>{parsed.food}</td>
                  <td>{parsed.nutrients && parsed.nutrients.ENERC_KCAL && parsed.nutrients.ENERC_KCAL.quantity ? parsed.nutrients.ENERC_KCAL.quantity : 'N/A'} kcal</td>
                  <td>{parsed.weight} g</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <table className="ingredient-table">
          <thead>
            <tr>
              <th>Nutrient</th>
              <th>Amount Per Serving</th>
              <th>% Daily Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Total Fat</strong></td>
              <td>{Math.round(nutritionData.totalNutrients.FAT.quantity * 10) / 10} {nutritionData.totalNutrients.FAT.unit}</td>
              <td>{Math.round(nutritionData.totalDaily.FAT.quantity)}%</td>
            </tr>
            <tr>
              <td><strong>Saturated Fat</strong></td>
              <td>{Math.round(nutritionData.totalNutrients.FASAT.quantity * 10) / 10} {nutritionData.totalNutrients.FASAT.unit}</td>
              <td>{Math.round(nutritionData.totalDaily.FASAT.quantity)}%</td>
            </tr>
            <tr>
              <td><strong>Trans Fat</strong></td>
              <td>{nutritionData.totalNutrients.FATRN ? Math.round(nutritionData.totalNutrients.FATRN.quantity * 10) / 10 : '-'}</td>
            </tr>
            <tr>
              <td><strong>Cholesterol</strong></td>
              <td>{Math.round(nutritionData.totalNutrients.CHOLE.quantity * 10) / 10} {nutritionData.totalNutrients.CHOLE.unit}</td>
              <td>{Math.round(nutritionData.totalDaily.CHOLE.quantity)}%</td>
            </tr>
            <tr>
              <td><strong>Sodium</strong></td>
              <td>{Math.round(nutritionData.totalNutrients.NA.quantity * 10) / 10} {nutritionData.totalNutrients.NA.unit}</td>
              <td>{Math.round(nutritionData.totalDaily.NA.quantity)}%</td>
            </tr>
            <tr>
              <td><strong>Total Carbohydrate</strong></td>
              <td>{Math.round(nutritionData.totalNutrients.CHOCDF.quantity * 10) / 10} {nutritionData.totalNutrients.CHOCDF.unit}</td>
              <td>{Math.round(nutritionData.totalDaily.CHOCDF.quantity)}%</td>
            </tr>
            <tr>
              <td><strong>Total Sugars</strong></td>
              <td>{nutritionData.totalNutrients.SUGAR ? Math.round(nutritionData.totalNutrients.SUGAR.quantity * 10) / 10 : '-'}</td>
            </tr>
            <tr>
              <td><strong>Protein</strong></td>
              <td>{Math.round(nutritionData.totalNutrients.PROCNT.quantity * 10) / 10} {nutritionData.totalNutrients.PROCNT.unit}</td>
              <td>{Math.round(nutritionData.totalDaily.PROCNT.quantity)}%</td>
            </tr>
            <tr>
              <td><strong>Vitamin D</strong></td>
              <td>{nutritionData.totalNutrients.VITD ? Math.round(nutritionData.totalNutrients.VITD.quantity * 10) / 10 : '-'}</td>
              <td>{Math.round(nutritionData.totalDaily.VITD.quantity)}%</td>
            </tr>
            <tr>
              <td><strong>Calcium</strong></td>
              <td>{Math.round(nutritionData.totalNutrients.CA.quantity * 10) / 10} {nutritionData.totalNutrients.CA.unit}</td>
              <td>{Math.round(nutritionData.totalDaily.CA.quantity)}%</td>
            </tr>
            <tr>
              <td><strong>Iron</strong></td>
              <td>{Math.round(nutritionData.totalNutrients.FE.quantity * 10) / 10} {nutritionData.totalNutrients.FE.unit}</td>
              <td>{Math.round(nutritionData.totalDaily.FE.quantity)}%</td>
            </tr>
            <tr>
              <td><strong>Potassium</strong></td>
              <td>{nutritionData.totalNutrients.K ? Math.round(nutritionData.totalNutrients.K.quantity * 10) / 10 : '-'}</td>
              <td>{Math.round(nutritionData.totalDaily.K.quantity)}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="nutrition-page">
      <h2>Nutrition Analysis</h2>
      <form onSubmit={handleSubmit} className="nutrition-form-container">
        <input type="text" value={food} onChange={handleInputChange} placeholder="Enter Food" />
        <button type="submit" disabled={!food || loading}>Get Nutrition Data</button>
      </form>
      {loading && <p>Loading...</p>}
      {renderNutritionData()}
    </div>
  );
};

export default NutritionPage;
