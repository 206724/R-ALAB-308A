import * as Carousel from "./Carousel.js";
import axios from "axios";

// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

// Step 0: Store your API key here for reference and easy access.
const API_KEY = "";

/**
 * 1. Create an async function "initialLoad" that does the following:
 * - Retrieve a list of breeds from the cat API using fetch().
 * - Create new <options> for each of these breeds, and append them to breedSelect.
 *  - Each option should have a value attribute equal to the id of the breed.
 *  - Each option should display text equal to the name of the breed.
 * This function should execute immediately.
 */

// 1. Initial Load Function
async function initialLoad() {
    try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random', {
            headers: {
                'x-api-key': API_KEY
            }
        });
        const breeds = await response.json();

        breeds.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed.id;
            option.textContent = breed.name;
            breedSelect.appendChild(option);
        });

        breedSelect.addEventListener('change', handleBreedSelect);

        // Initial call to create the initial carousel if a breed is selected
        if (breedSelect.value) {
            handleBreedSelect();
        }
    } catch (error) {
        console.error('Error fetching breeds:', error);
    }
}


/**
 * 2. Create an event handler for breedSelect that does the following:
 * - Retrieve information on the selected breed from the cat API using fetch().
 *  - Make sure your request is receiving multiple array items!
 *  - Check the API documentation if you're only getting a single object.
 * - For each object in the response array, create a new element for the carousel.
 *  - Append each of these new elements to the carousel.
 * - Use the other data you have been given to create an informational section within the infoDump element.
 *  - Be creative with how you create DOM elements and HTML.
 *  - Feel free to edit index.html and styles.css to suit your needs, but be careful!
 *  - Remember that functionality comes first, but user experience and design are important.
 * - Each new selection should clear, re-populate, and restart the Carousel.
 * - Add a call to this function to the end of your initialLoad function above to create the initial carousel.
 */


// 2. Handle Breed Select Function
async function handleBreedSelect() {
    const breedId = breedSelect.value;

    try {
        const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&limit=5`, {
            headers: {
                'x-api-key': API_KEY
            }
        });
        const breedData = await response.json();

        // Clear existing carousel content
        Carousel.clear();
        infoDump.innerHTML = '';

        breedData.forEach(item => {
            const img = document.createElement('img');
            img.src = item.url;
            img.alt = item.breeds[0].name;
            Carousel.add(img);
        });

        const breedInfo = breedData[0].breeds[0];
        const infoDiv = document.createElement('div');
        infoDiv.innerHTML = `
            <h2>${breedInfo.name}</h2>
            <p>${breedInfo.description}</p>
            <p>Temperament: ${breedInfo.temperament}</p>
            <p>Origin: ${breedInfo.origin}</p>
            <p>Life Span: ${breedInfo.life_span} years</p>
        `;
        infoDump.appendChild(infoDiv);
    } catch (error) {
        console.error('Error fetching breed information:', error);
    }
}

// Execute initial load immediately
initialLoad();

//  * 4. Change all of your fetch() functions to axios!
//  * - axios has already been imported for you within index.js.
//  * - If you've done everything correctly up to this point, this should be simple.
//  * - If it is not simple, take a moment to re-evaluate your original code.
//  * - Hint: Axios has the ability to set default headers. Use this to your advantage
//  *   by setting a default header with your API key so that you do not have to
//  *   send it manually with all of your requests! You can also set a default base URL!



async function initialLoad() {
    try {
        const response = await axios.get('/breeds');
        const breeds = response.data;

        breeds.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed.id;
            option.textContent = breed.name;
            breedSelect.appendChild(option);
        });

        breedSelect.addEventListener('change', handleBreedSelect);

        // Initial call to create the initial carousel if a breed is selected
        if (breedSelect.value) {
            handleBreedSelect();
        }
    } catch (error) {
        console.error('Error fetching breeds:', error);
    }
}



async function handleBreedSelect() {
    const breedId = breedSelect.value;

    try {
        const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&limit=5`, {
            headers: {
                'x-api-key': API_KEY
            }
        });
        const breedData = await response.json();

        // Clear existing carousel content
        Carousel.clear();
        infoDump.innerHTML = '';

        breedData.forEach(item => {
            const carouselItem = Carousel.createCarouselItem(item.url, item.breeds[0].name, item.id);
            Carousel.appendCarousel(carouselItem);
        });

        const breedInfo = breedData[0].breeds[0];
        const infoDiv = document.createElement('div');
        infoDiv.innerHTML = `
            <h2>${breedInfo.name}</h2>
            <p>${breedInfo.description}</p>
            <p>Temperament: ${breedInfo.temperament}</p>
            <p>Origin: ${breedInfo.origin}</p>
            <p>Life Span: ${breedInfo.life_span} years</p>
        `;
        infoDump.appendChild(infoDiv);

        Carousel.start();
    } catch (error) {
        console.error('Error fetching breed information:', error);
    }
}

// Execute initial load immediately
initialLoad();


/**
 * 3. Fork your own sandbox, creating a new one named "JavaScript Axios Lab."
 */
/**
 * 4. Change all of your fetch() functions to axios!
 * - axios has already been imported for you within index.js.
 * - If you've done everything correctly up to this point, this should be simple.
 * - If it is not simple, take a moment to re-evaluate your original code.
 * - Hint: Axios has the ability to set default headers. Use this to your advantage
 *   by setting a default header with your API key so that you do not have to
 *   send it manually with all of your requests! You can also set a default base URL!
 */
/**
 */