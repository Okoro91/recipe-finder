import React from "react";
import Ingredients from "./items/Ingredients";
import Recipe from "./items/Recipe";
import { getGeneratedRecipe } from "../../ai";

const Main = () => {
  const [ingredients, setIngredients] = React.useState([]);
  const [showRecipe, setShowRecipe] = React.useState("");

  const getRecipe = async () => {
    const recipeMarkdown = await getGeneratedRecipe(ingredients);
    console.log(recipeMarkdown);
    setShowRecipe(recipeMarkdown);
  };

  const handleSubmit = (formData) => {
    const newIngredient = formData.get("ingredient");
    setIngredients((prev) => [...prev, newIngredient]);
  };

  return (
    <main>
      <h2>Welcome to Chef Okoro Kichen</h2>
      <p>Enter your ingredients and get our best recipe recommendation</p>
      <form action={handleSubmit} className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. Rice (3 at least)"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>
      {ingredients.length > 0 && (
        <Ingredients ingredients={ingredients} getRecipe={getRecipe} />
      )}
      {showRecipe && <Recipe showRecipe={showRecipe} />}
    </main>
  );
};

export default Main;
