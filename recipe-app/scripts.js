const randomMealURL = 'https://www.themealdb.com/api/json/v1/1/random.php';
const searchMealURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

const allMealsDiv = document.querySelector('#all-meals-div');
const mealInfoDiv = document.getElementById('meal-info');
const mealPopup = document.getElementById('meal-popup');
const popupCloseButton = document.getElementById('close-popup');
const searchInput = document.querySelector('#search-input');
const searchForm = document.querySelector('form');

let favouriteMealIds = new Set(); //TODO: Add to localStorage

displayRandomMeal();
fetchFavouriteMeals();

searchForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page refresh
    searchMeals();
});

function fetchFavouriteMeals() {
    //TODO
}

function searchMeals() {
    fetch(`${searchMealURL}${searchInput.value}`)
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
        // alert('yo!');
        if (favButton.classList.contains('active')) {
            removeMealFromFavourites(mealData.idMeal);
            favButton.classList.remove('active');
        } else {
            addMealToFavourites(mealData.idMeal);
            favButton.classList.add('active');
        }

        fetchFavouriteMeals();
        console.log('Fav meals: ', favouriteMealIds);
    });
}

function addMealToFavourites(mealId) {
    favouriteMealIds.add(mealId);
}

function removeMealFromFavourites(mealId) {
    favouriteMealIds.delete(mealId);
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