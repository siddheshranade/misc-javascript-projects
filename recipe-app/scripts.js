const randomMealURL = 'https://www.themealdb.com/api/json/v1/1/random.php';
const searchMealByNameURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const searchMealByIdURL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

const allMealsDiv = document.querySelector('#all-meals-div');
const favouriteMealsList = document.querySelector('#all-fav-meals');
const mealInfoDiv = document.getElementById('meal-info');
const mealPopup = document.getElementById('meal-popup');
const popupCloseButton = document.getElementById('close-popup');
const searchInput = document.querySelector('#search-input');
const searchForm = document.querySelector('form');

displayRandomMeal();
fetchFavouriteMeals();

searchForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page refresh
    searchMeals();
});

async function fetchFavouriteMeals() {
    favouriteMealsList.innerHTML = '';

    let mealIds = getFavouriteMealsIdsFromLS();
    for (let i = 0; i < mealIds.length; i++) {
        let meal = await getMealById(mealIds[i]);
        displayMealInFavouritesList(meal);
    }
}

async function getMealById(id) {
    const result = await fetch(`${searchMealByIdURL}${id}`);
    const data = await result.json();
    return data.meals[0];
}

function displayMealInFavouritesList(meal) {
    const favMeal = document.createElement('li');
    favMeal.innerHTML = `
        <img
            src="${meal.strMealThumb}"
            alt="${meal.strMeal}"
        /><span>${meal.strMeal}</span>
        <button class="clear-button"><i class="fas fa-window-close"></i></button>
    `

    const closeButton = favMeal.querySelector(".clear-button");
    closeButton.addEventListener('click', () => {
        removeFavouriteMealIdFromLS(meal.idMeal);
        fetchFavouriteMeals();
    });

    favMeal.addEventListener('click', () => {
        showMealInfoInPopup(meal);
    });

    favouriteMealsList.appendChild(favMeal);
}

function searchMeals() {
    fetch(`${searchMealByNameURL}${searchInput.value}`)
        .then(res => res.json())
        .then(data => {
            let meals = data['meals'];
            if (!meals) {
                return;
            }

            allMealsDiv.innerHTML = ''; // Remove random meal that was displayed on page load
            meals.forEach(meal => {
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
        <div class="meal-image-div">
            <img
                class="meal-image"
                src="${mealData.strMealThumb}"
                alt="${mealData.strMeal}"
            />
        </div>
        <div class="meal-body-div">
            <h4 class="meal-name">${mealData.strMeal}</h4>
            <button class="fav-btn">
                <i class="fas fa-heart"></i>
            </button>
        </div>           
        `;

    allMealsDiv.appendChild(mealDiv);

    const favButton = mealDiv.querySelector('.fav-btn'); // won't work with document.querySelector()
    favButton.addEventListener('click', () => {
        if (favButton.classList.contains('active')) {
            removeFavouriteMealIdFromLS(mealData.idMeal);
            favButton.classList.remove('active');
        } else {
            addFavouriteMealIdToLS(mealData.idMeal);
            favButton.classList.add('active');
        }

        fetchFavouriteMeals();
    });
}

function getFavouriteMealsIdsFromLS() {
    let mealIds = JSON.parse(localStorage.getItem('mealIds'));

    return mealIds ? mealIds : [];
}

function addFavouriteMealIdToLS(mealId) {
    let mealIds = getFavouriteMealsIdsFromLS();
    if (mealIds.includes(mealId)) {
        return;
    }

    mealIds.push(mealId);
    localStorage.setItem('mealIds', JSON.stringify(mealIds));
}

function removeFavouriteMealIdFromLS(mealId) {
    let mealIds = getFavouriteMealsIdsFromLS();
    mealIds.splice(mealIds.indexOf(mealId), 1);
    localStorage.setItem('mealIds', JSON.stringify(mealIds));
}

function showMealInfoInPopup(mealData) {
    mealInfoDiv.innerHTML = '';
    const mealDiv = document.createElement('div');

    const ingredients = [];
    let count = 1;
    while (mealData['strIngredient' + count]) {
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
});