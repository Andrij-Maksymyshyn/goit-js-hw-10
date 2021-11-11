import { debounce } from 'lodash';
import { Notify } from 'notiflix';
import { fetchCountries } from './fetchCountries';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(() => {
    if (input.value.trim() === '') {
                countryList.innerHTML = '';
                countryInfo.innerHTML = '';
                return;
            };
    
    const country = input.value;
    fetchCountries(country.trim())
    .then(showCountry)
    .catch((error) => console.log(error));
}, DEBOUNCE_DELAY));


function showCountry(data) {
    if (data.length > 10) {
             return Notify.info("Too many matches found. Please enter a more specific name.");
            }

    else if ((data.length >= 2) && (data.length <= 10)) {
        const markupCountries = data
        .map((states) => {
            return `<div class="union">
            <img src="${states. flags.svg}" alt="countries flag" width="40" height="30"/>
            <h1 class ="res_h">${states.name.official}</h1>
            </div>`
        })
        .join("");

       return countryList.innerHTML = markupCountries;

    } else {        
    
    const markupCountry = data
        .map((state) => {
            return `<li>
            <div class="union">
            <img src="${state. flags.svg}" alt="countries flag" width="40" height="30"/>
            <h1 class ="res_h">${state.name.official}</h1></div>
            <p><b>Capital</b>:<span class ="res_h">${state.capital}</span></p>
            <p><b>Population</b>:<span class ="res_h">${state.population}</span></p>
            <p><b>Languages</b>:<span class ="res_h">${Object.values(state.languages)}</span></p>
            </li>`; 
            })
        .join("");
       
      return  countryInfo.innerHTML = markupCountry;
    }        
                 
}


