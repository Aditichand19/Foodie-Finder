const searchbox = document.querySelector('.searchbox');
const searchbtn = document.querySelector('.searchbtn');
const recipeContainer = document.querySelector('#recipes');
const resultHeader = document.querySelector('#result-header');
const placeholderHeader = document.querySelector('#placeholder-header');
const placeholderImg = document.querySelector('#placeholder-img');
const placeholderText = document.querySelector('#placeholder-text');
const recipeDetails = document.querySelector('#recipe-details');

// Function to fetch recipes
const fetchRecipes = async (query) => {
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();

        // Clear placeholders and previous results
        placeholderHeader.style.display = 'none';
        placeholderImg.style.display = 'none';
        placeholderText.style.display = 'none';
        recipeContainer.innerHTML = '';
        recipeDetails.style.display = 'none';

        // Show "XYZ" header
        resultHeader.style.display = 'block';

        // Handle no results
        if (!response.meals) {
            recipeContainer.innerHTML = `<p style="text-align: center; font-size: 32px; margin-left: 67px;
">No recipes found. Try another keyword!&#128557</p>`;
            return;
        }

        // Display recipes
        response.meals.forEach((meal) => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');

            recipeDiv.innerHTML = `
                <img 
                    src="${meal.strMealThumb}" 
                    alt="${meal.strMeal}" 
                    style="max-width: 100%; border-radius: 8px; transition: transform 0.3s ease;"
                >
                <h3>${meal.strMeal}</h3>
                <p><strong>Area:</strong> ${meal.strArea}</p>
                <p><strong>Category:</strong> ${meal.strCategory}</p>
            `;

            recipeDiv.addEventListener('click', () => showRecipeDetails(meal, recipeDiv));
            recipeContainer.appendChild(recipeDiv);
        });
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
};

// Function to display recipe details
const showRecipeDetails = (meal, recipeDiv) => {
    recipeDetails.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img 
            src="${meal.strMealThumb}" 
            alt="${meal.strMeal}" 
            style="max-width: 300px; border-radius: 8px; margin: 20px 0;"
        >
        <p><strong>Category:</strong> ${meal.strCategory}</p>
        <p><strong>Area:</strong> ${meal.strArea}</p>
        <p><strong>Instructions:</strong> ${meal.strInstructions}</p>
    `;

    // Apply inline CSS to decrease the size of the clicked item image
    const clickedImage = recipeDiv.querySelector('img');
    clickedImage.style.transform = 'scale(0.8)';
    clickedImage.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    clickedImage.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';

    // Show recipe details and animate scroll
    recipeDetails.style.display = 'block';
    recipeDetails.classList.add('active');
    recipeDetails.scrollIntoView({ behavior: 'smooth' });
};

// Event listener for search
searchbtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchbox.value.trim();

    if (searchInput) {
        fetchRecipes(searchInput);
    }
});
