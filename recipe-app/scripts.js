const randomMealAPILink = 'https://www.themealdb.com/api/json/v1/1/random.php';

const allMealsDiv = document.querySelector('#all-meals-div');

fetch(randomMealAPILink)
    .then(res => res.json())
    .then(data => {
        let mealData = data['meals'][0];
        addMealToPageDOM(mealData);
    });

function addMealToPageDOM(mealData) {
    allMealsDiv.innerHTML =
        `
        <div id="meal">
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
        </div>
        `;
}