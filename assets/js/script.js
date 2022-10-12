var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#result-content');
var searchFormEl = document.querySelector('#search-form');

function getParams() {
  // Get the search params out of the URL (i.e. `?q=london&format=photo`) and convert it to an array (i.e. ['?q=london', 'format=photo'])
  var searchParamsArr = document.location.search.split('&');

  // Get the query and format values
  var query = searchParamsArr[0].split('=').pop();
  searchApi(query);
}

function printResults(resultObj) {
  console.log(resultObj);

  // set up `<div>` to hold result content
  var resultCard = document.createElement('div');
  resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');

  var resultBody = document.createElement('div');
  resultBody.classList.add('card-body');
  resultCard.append(resultBody);

  var titleEl = document.createElement('h3');
  titleEl.textContent = resultObj.city.name;

  var bodyContentEl = document.createElement('p');
  bodyContentEl.innerHTML =
    '<strong>Date:</strong> ' + resultObj.clouds.dt_txt + '<br/>';

  if (resultObj.main.temp) {
    bodyContentEl.innerHTML +=
      '<strong>Temp:</strong> ' + resultObj.main.temp + '<br/>';
  } else {
    bodyContentEl.innerHTML +=
      '<strong>Temp:</strong> No temp for this entry.';
  }

  if (resultObj.wind.speed) {
    bodyContentEl.innerHTML +=
      '<strong>Wind:</strong> ' + resultObj.wind.speed + '<br/>';
  } else {
    bodyContentEl.innerHTML +=
      '<strong>wind:</strong>  No wind for this entry.';
  }

  if (resultObj.main.himidity) {
    bodyContentEl.innerHTML +=
      '<strong>Humidity:</strong> ' + resultObj.main.humidity;
  } else {
    bodyContentEl.innerHTML +=
      '<strong>Humidity:</strong>  No Humidity for this entry.';
  }
  /*var linkButtonEl = document.createElement('a');
  linkButtonEl.textContent = 'Read More';
  linkButtonEl.setAttribute('href', resultObj.url);
  linkButtonEl.classList.add('btn', 'btn-dark');*/

  resultBody.append(titleEl, bodyContentEl);

  resultContentEl.append(resultCard);
}

function searchApi(query) {
  var locQueryUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=33.74831&lon=-84.39111&appid=c5c51646087c13d93835382d88138aa0';

 /* if (format) {
    locQueryUrl = 'https://www.loc.gov/' + format + '/?fo=json';
  }

  locQueryUrl = locQueryUrl + '&q=' + query;*/

  fetch(locQueryUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })
    .then(function (locRes) {
      // write query to page so user knows what they are viewing
      resultTextEl.textContent = locRes.city.name;

      console.log(locRes);

      if (!locRes.list.length) {
        console.log('No results found!');
        resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
      } else {
        resultContentEl.textContent = '';
        for (var i = 0; i < 5; i++) {
          printResults(locRes.results[i]);
        }
      }
    })
    .catch(function (error) {
      console.error(error);
    });
}

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector('#search-input').value;

  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }

  searchApi(searchInputVal);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

getParams();
