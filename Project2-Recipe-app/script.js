const searchInput = document.querySelector(".searchInput")
const searchBtn = document.querySelector(".searchBtn")
const recipeContainer = document.querySelector(".recipeContainer")
const recipeDetailsContent = document.querySelector(".recipeDetailsContent")
const recipeCloseButton = document.querySelector(".recipeCloseBtn")

/// arrow funciton to fetch the recipe data

const fetchRecipes = async (recipeName) => {
    recipeContainer.innerHTML = `<h2>Fetching Recipes....</h2>`


    try {

        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeName}`)
        const response = await data.json()
     
     
        recipeContainer.innerHTML = ""
        response.meals.forEach((meal) => {
            console.log(meal);
            const recipeCard = document.createElement('div')
            recipeCard.classList.add("recipeCardDetails")
            recipeCard.innerHTML = 
                   `<img src="${meal.strMealThumb}"/>
                   <h3>${meal.strMeal}</h3>
                   <p><span>${meal.strArea}</span> Dish</p>
                   <p class="category">Belongs to <span>${meal.strCategory}</span> Category </p>
                   
                   ` 
         const button = document.createElement("button")
         button.classList.add('recipeView')
         button.innerHTML = "View Recipe"
     
     
         // Adding Eventlistener to recipeView button
         button.addEventListener('click', () => {
             openRecipePopup(meal)
         })
         recipeCard.appendChild(button)
         recipeContainer.appendChild(recipeCard)
     
     
         searchInput.value  = ""
         })
        
    } catch (error) {
    recipeContainer.innerHTML = `<h2>Error in  fetching Recipes....</h2>`
        
    }
 
}

//function to fetch incredent and measurements

const fetchIngredents = (meal) => {
      let ingredentsList = ""
      for(let i=1; i<=20; i++){
         const ingredent = meal[`strIngredient${i}`]
         if(ingredent){
            const measure = meal[`strMeasure${i}`]
            ingredentsList +=  `<li>${measure} ${ingredent}</li>`
         }else{
            break;
         }
      }

      return ingredentsList
}


const openRecipePopup = (meal) => {
     recipeDetailsContent.innerHTML = `
     <h2>${meal.strMeal}</h2>
     <h3>Ingredents: ${meal.strMeal}</h3>
     <ul>${fetchIngredents(meal)}</ul>
       <div>
        <h3>Instruction: </h3>
        <p>${meal.strInstructions}</p>
       </div>
     `
     

     recipeDetailsContent.parentElement.style.display = "block"
}


// adding event listener to search button

searchBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const inputRecipe = searchInput.value.trim()
    if(!inputRecipe){
        recipeContainer.innerHTML = `<h2>Type the meal in the search box.</h2>`
        return
    }
    fetchRecipes(inputRecipe)
})


recipeCloseButton.addEventListener("click",() => {
     recipeDetailsContent.parentElement.style.display = "none"
})