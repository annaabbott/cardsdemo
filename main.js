import { senate } from './senate.js'
import { house } from './house.js'

function mapFunc(senator) {
  return {
    name: `${senator.first_name} ${senator.last_name}`,
    party: senator.party,
    state: senator.state,
    leadership_role: senator.leadership_role ? senator.leadership_role : "none",
    url: senator.url,
    photoUrl: 'https://theunitedstates.io/images/congress/225x275/' + senator.id + '.jpg'
  }
}

const cards = senate.map(mapFunc);

const cardListDiv = document.getElementById("card-list");

for (let i = 0; i < cards.length; i++) {
  const item = cards[i];
  const card = MakeSenatorCard(item);
  cardListDiv.appendChild(card);
}





function MakeSenatorCard(senator) {
  // Create the <div> for the scene card
  const sceneCard = document.createElement('div');
  sceneCard.classList.add("scene");

  // Create the <div> for the card
  const card = document.createElement('div');
  card.classList.add("card");
  card.addEventListener( 'click', function() {
    card.classList.toggle('is-flipped');
  });
  sceneCard.appendChild(card);

  // Create the <div> for the front of the card
  const frontFace = MakeCardFront(senator);
  card.appendChild(frontFace);

  // Create the <div> for the back of the card
  const backFace = MakeCardBack(senator);
  card.appendChild(backFace);

  return sceneCard;
}

function MakeCardFront(senator) {
  // Create the <div> for the front of the card
  const frontFace = document.createElement('div');
  frontFace.classList.add("card__face", "card__face--front");

  const figure = document.createElement('figure');

  const photo = document.createElement('img');
  photo.src = senator.photoUrl;
  figure.appendChild(photo);

  const figcaption = document.createElement('figcaption');
  figcaption.innerText = senator.name;
  figure.appendChild(figcaption);

  frontFace.appendChild(figure);

  return frontFace;
}

function MakeCardBack(senator) {
  const backFace = document.createElement('div');
  backFace.classList.add("card__face", "card__face--back");
  backFace.innerText = senator.last_name;

  return backFace;
} 