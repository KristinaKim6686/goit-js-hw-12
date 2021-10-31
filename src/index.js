
import * as _ from "lodash";
import * as PNotify from "@pnotify/core";
import * as PNotifyMobile from "@pnotify/mobile";
import "@pnotify/core/dist/BrightTheme.css";
import fetchCountry from './templates/js/fetch-countries-api';
import countryCardTpl from './templates/hbs/country-cards.hbs';
import countryList from './templates/hbs/country-list.hbs';
import './templates/styles.css'

const refs = {
    countryCardContainer: document.querySelector('.country__data'),
    searchInput: document.querySelector('.input__control')
};

const myStack = new PNotify.Stack({
  dir1: "up",
});
refs.searchInput.addEventListener('input', _.debounce(onSearch,500));


function onSearch(e) {
  e.preventDefault();
  fetchCountry(e)
    .then((data) => {
    refs.countryCardContainer.innerHTML = "";
    myStack.close(true);
    if (data.length === 1) {
      refs.countryCardContainer.insertAdjacentHTML("beforeend", countryCardTpl(data[0]))
    } else if (data.length < 11) {
      data.forEach((country) => {
        console.log(country.name);
      });
      refs.countryCardContainer.insertAdjacentHTML("beforeend", countryList(data))
    } else if(data.length>10){
      PNotify.notice({
        text: "Too many matches found. Please, enter a more specific name!",
        stack: myStack,
        modules: new Map([...PNotify.defaultModules, [PNotifyMobile, {}]]),
      })
    } else {
       PNotify.notice({
        text: "Such country doesnot exist!Try to type something normal O.o",
        stack: myStack,
        modules: new Map([...PNotify.defaultModules, [PNotifyMobile, {}]]),
      })
    }
  })
    
}


