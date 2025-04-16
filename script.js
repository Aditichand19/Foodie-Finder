//console.log used to print values to browser's console.. mainly for debugging
const searchbox= document.querySelector('.searchbox'); //const becoz variable cant reassigned new value
const searchbtn= document.querySelector('.searchbtn');//Selects HTML element with class searchbtn & stores in searchbtn.
const recipeContainer= document.querySelector('.container');

// Function to fetche recipes
const fetchRecipes = async(query)=> { //Defines asynchronous func(func that runs parallely w other func) to fetch recipes based on query(search input)
    //fetches data from the API using the query provided. 
    const data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`) //bacltick(``)used to create template literals
    const response= await data.json(); //Convert fetch data into JS object (JSON format)stores in response

    response.meals.forEach(meal => {
        const recipeDiv= document.createElement('div'); //Creates new div element to hold recipe details
        recipeDiv.classList.add('recipe'); //Add class recipe to newly created div

        recipeDiv.innerHTML= `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p>${meal.strArea}</p>
        <p>${meal.strCategory}</p>
        `
        recipeContainer.appendChild(recipeDiv);
    });
    // console.log(respone.meals[0]);
}
searchbtn.addEventListener('click',(e)=>{
    e.preventDefault(); //to prevent to auto submit
    const searchInput= searchbox.value.trim(); //Get text input from search box,removes extra space & stores in searchInput
    fetchRecipes(searchInput); //Calls fetchRecipes funct with user's input to fetch & display recipes
})