import { senate } from './senate.js'
import { house } from './house.js'

// Set an event listener for mouseover
var card = document.querySelector('.card');
card.addEventListener( 'mouseover', function() {
  card.classList.toggle('is-flipped');
});