import { Notify } from 'notiflix';

export function fetchCountries(country){
    return fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(responce => {
        if (!responce.ok) {
         Notify.failure('Oops, there is no country with that name');
           throw Error(responce.statusText) 
        }
                
        return responce.json()
        }
        )
 };


 