// Global Constants
const keyGIPHY = "RNtYFS9Q4vYDV1E5LLJsw58nQdlOZReC";
let limit = 9;
let amountDisplayed = 9;
let responseData;

let offset = 0;

// Query Selectors
let giphy_form = document.querySelector("form");
console.log("giphy_form: ", giphy_form);
let search_bar = document.getElementById('search_bar');
let gif_container = document.getElementById('gif_content');
let more_button = document.getElementById('more_button');

giphy_form.addEventListener("submit", getGIFS);
more_button.addEventListener("click", getMore);
random_button.addEventListener("click", getRandom);



async function getGIFS(evt) {
    offset = 0;

    console.log("Inside of function getGIFS - form submitted");
    console.log(evt);

    evt.preventDefault();
    let apiURL = "https://api.giphy.com/v1/gifs/search?api_key=" + keyGIPHY + "&q=" + evt.target.search_bar.value + "&limit=" + limit.value + "&offset=0&rating=pg-13&lang=en";
    console.log(evt.target.search_bar.value);
    console.log(apiURL);

    let response = await fetch(apiURL);
    console.log("response is ", response);

    responseData = await response.json();
    console.log("responseData is: ", responseData);

    getResults(responseData);
}

async function getRandom(evt) {
    search_bar.value = '';
    offset = 0;

    console.log("Inside of function getGIFS - form submitted");
    console.log(evt);

    

    var jsonRandom = {
        data: []
    };

    for(let i = 0; i < 9; i++) {
    evt.preventDefault();
        let apiURL = "https://api.giphy.com/v1/gifs/random?api_key=RNtYFS9Q4vYDV1E5LLJsw58nQdlOZReC&tag=&rating=pg-13";
        //console.log(apiURL);

        let response = await fetch(apiURL);
        //console.log("response is ", response);

        responseData = await response.json();
        //console.log("responseData is: ", responseData);

        jsonRandom.data.push({
            "title" : responseData.data.title,
            "source" : `${responseData.data.images.original.url}`
        });      
    }

    
    console.log("json: ", jsonRandom);
    //console.log(responseData);

    //getResultsRandom(responseData);
    getResultsRandom(jsonRandom);
}

function getResultsRandom(searchData){
    while (gif_container.firstChild) {
        gif_container.removeChild(gif_container.firstChild);
    }

    for(let i = 0; i < amountDisplayed; i++){
        let tempImage = document.createElement('img');
        tempImage.src= `${searchData.data[i].source}`;
        tempImage.alt= `${searchData.data[i].title}`;
        tempImage.classList.add('gif');

        gif_container.appendChild(tempImage);
    }
}

/*

function getResultsRandom(searchData) {
    more_button.classList.add('hidden');
    while (gif_container.firstChild) {
        gif_container.removeChild(gif_container.firstChild);
    }
    tempImage = document.createElement('img');
    tempImage.src= `${searchData.data.images.original.url}`;
    tempImage.alt= `${searchData.data.title}`;
    tempImage.classList.add('gif');
    tempImage.classList.add('random');

    gif_container.appendChild(tempImage);

}
*/

function getMore(){
    getResults(responseData);
}

function getResults(searchData){
    more_button.classList.remove('hidden');
    while (gif_container.firstChild) {
        gif_container.removeChild(gif_container.firstChild);
    }

    for(let i = 0; i < amountDisplayed; i++){
        let tempImage = document.createElement('img');
        tempImage.src= `${searchData.data[offset].images.original.url}`;
        tempImage.alt= `${searchData.data[offset].title}`;
        tempImage.classList.add('gif');

        gif_container.appendChild(tempImage);

        offset++;
        if(offset == 49) {
            more_button.classList.add('hidden');
            break;
            
        }
    }
}