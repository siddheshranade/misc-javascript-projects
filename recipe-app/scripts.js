const randomMealURL = 'https://www.themealdb.com/api/json/v1/1/random.php';
const searchMealURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

const allMealsDiv = document.querySelector('#all-meals-div');
const mealInfoDiv = document.getElementById('meal-info');
const mealPopup = document.getElementById('meal-popup');
const popupCloseButton = document.getElementById('close-popup');
const searchInput = document.querySelector('#search-input');
const searchForm = document.querySelector('form');

// On page load:
displayRandomMeal();
fetchFavMeals();

searchForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page refresh
    searchMeals();
});

function fetchFavMeals() {
    //TODO
}

function searchMeals() {
    fetch(`${searchMealURL}${searchInput.value}`)
        .then(res => res.json())
        .then(data => {
            let meals = data['meals'];
            meals.forEach(meal => {
                allMealsDiv.innerHTML = ''; // Remove initially displayed random meal
                displayMealPreviewTile(meal)
            });
        });
}

function displayRandomMeal() {
    fetch(randomMealURL)
        .then(res => res.json())
        .then(data => {
            let mealData = data['meals'][0];
            displayMealPreviewTile(mealData);
        });
}

function displayMealPreviewTile(mealData) {
    const mealDiv = document.createElement('div');
    mealDiv.setAttribute('id', 'meal');
    mealDiv.addEventListener('click', () => { showMealInfoInPopup(mealData); });

    mealDiv.innerHTML =
        `
        <div id="meal-image-div">
            <img
                id="meal-image"
                src="${mealData.strMealThumb}"
                alt="${mealData.strMeal}"
            />
        </div>
        <div id="meal-body-div">
            <h4 id="meal-name">${mealData.strMeal}</h4>
            <button id="fav-btn">
                <i class="fas fa-heart"></i>
            </button>
        </div>           
        `;

    //TODO: Add fav functionality

    allMealsDiv.appendChild(mealDiv);
}

function showMealInfoInPopup(mealData) {
    mealInfoDiv.innerHTML = '';
    const mealDiv = document.createElement('div');

    const ingredients = [];
    let count = 1;
    while (mealData['strIngredient' + count]) {
        console.log(`${mealData['strIngredient' + count]} - ${mealData['strMeasure' + count]}`);
        ingredients.push(
            `${mealData['strIngredient' + count]} - ${mealData['strMeasure' + count]}`
        );
        count++;
    }

    mealDiv.innerHTML = `
        <h1>${mealData.strMeal}</h1>
        <img
            src="${mealData.strMealThumb}"
            alt="${mealData.strMeal}"
        />
        <p>${mealData.strInstructions}</p>
        <h3>Ingredients:</h3>
        <ul>
            ${
                ingredients.map(each => `<li>${each}</li>`).join('')
            }
        </ul>        
    `;

    mealInfoDiv.appendChild(mealDiv);

    mealPopup.classList.remove('hidden');
}

popupCloseButton.addEventListener('click', () => {
    mealPopup.classList.add('hidden');
})