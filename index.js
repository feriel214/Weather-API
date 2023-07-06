const container = document.querySelector('.container');  //  <div></div>
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = '3579b2dc09d7064b1e96ad7972e6520b';
    const city = document.querySelector('.search-box input').value; // country 

    if (city === '')
        return;
    // envoyer une request get avec params (city , key )
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            // console pour voir le format de donnees retournees 7
            console.log("json response from server ", json) 
            // code : 404 notfound  
            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');   //<img src="" >  // ligne 30 dans HTML 
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');
            //pour trouver la bonne image en fonction de l'etat du climat  et l'injecter 
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'images/mist.png';
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';


        });


});



// REQUEST : GET with paramas 
// recherche video : (date , descreption , source code (al github ???? ))
// Notion API : 401 (unathorized)  , 404 notfound 
// Weather API : free (activated)   : DOC { } ===>personallisé 
//







/***
 1- API free countrys : consommation api 
 2- event (input : zone texte ) key press (input.value)  == searchWord
 3- bellehy amel filter("tun") 
 4- 
 */