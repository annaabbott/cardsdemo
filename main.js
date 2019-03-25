import { senate } from './senators.json'
import { house } from '.representatives.json'

var card = document.querySelector('.card');
card.addEventListener( 'mouseover', function() {
  card.classList.toggle('is-flipped');
});