import { senate } from './senate.js'
import { house } from './house.js'

// Set an event listener for mouseover
var card = document.querySelector('.card');
card.addEventListener( 'mouseover', function() {
  card.classList.toggle('is-flipped');
});

/*

TODO:
  * Figure out where to get pictures of all the senators I want to represent
  * Figure out what stats I want on the back
      * Name
      * Party
      * home state
      * date elected
      * number of terms
      * website
      * age
  * Come up with a function that can generate DOM elements for the picture
  * Come up with a function that can generate DOM elements for the stats
*/