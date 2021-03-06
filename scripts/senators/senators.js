import { senate } from './senate.js'
// import { house } from './house.js'

class Senator {
  constructor(senator) {
    this.first_name = senator.first_name;
    this.last_name = senator.last_name;
    this.party = senator.party;
    this.state = senator.state;
    this.leadership_role = senator.leadership_role ? senator.leadership_role : "none";
    this.url = senator.url;
    this.photoUrl = `https://theunitedstates.io/images/congress/225x275/${senator.id}.jpg`;
    this.selected = false;
  }

  fullName() {
    return `${this.first_name} ${this.last_name}`;
  }
}

const allCards = senate.map(senator => new Senator(senator));

const seed = Math.floor(
  Math.random() * 100
);
const STEP = 67;

let x = seed;
for (let i = 0; i < 25; i++) {
  allCards[x].selected = true;
  x = (x + STEP) % 100;
}

const visibleCards = allCards.filter(card => card.selected);
addCards(visibleCards);

function addCards(newCards) {
  const cardListDiv = document.getElementById("card-list");

  for (let i = 0; i < newCards.length; i++) {
    const item = newCards[i];
    const card = MakeSenatorCard(item);
    cardListDiv.appendChild(card);
  }
}

function MakeSenatorCard(senator) {
  // Create the <div> for the scene card
  const sceneCard = document.createElement('div');
  sceneCard.classList.add("scene");

  // Create the <div> for the card
  const card = document.createElement('div');
  card.classList.add("card");
  card.addEventListener('click', function () {
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

  if (senator.party === 'R') {
    frontFace.classList.add('republican-background');
  } else if (senator.party === 'D') {
    frontFace.classList.add('democrat-background');
  }

  const figure = document.createElement('figure');

  const photo = document.createElement('img');
  photo.src = senator.photoUrl;
  figure.appendChild(photo);

  const figcaption = document.createElement('figcaption');
  figcaption.innerText = senator.fullName();
  figure.appendChild(figcaption);

  frontFace.appendChild(figure);

  return frontFace;
}

function MakeCardBack(senator) {
  const backFace = document.createElement('div');
  backFace.classList.add("card__face", "card__face--back");

  backFace.appendChild(makeStat('Name', senator.fullName()));
  backFace.appendChild(makeStat('Party', senator.party));
  backFace.appendChild(makeStat('State', senator.state));
  backFace.appendChild(makeStat('Leadership Role', senator.leadership_role));
  const img = document.createElement('img');
  img.src = `./images/senateSeal.png`;
  const imgDiv = document.createElement('div');
  imgDiv.classList.add('senateSeal');
  imgDiv.appendChild(img);
  backFace.appendChild(imgDiv);
  backFace.appendChild(makeUrlStat(senator.url));


  return backFace;
}

function makeStat(label, text) {
  const div = document.createElement('div');

  const strong = document.createElement('strong');
  strong.innerText = label + ': ';
  div.appendChild(strong);

  const span = document.createElement('span');
  span.innerText = text;
  div.appendChild(span);

  return div;
}

function makeUrlStat(url) {
  const strong = document.createElement('strong');
  strong.innerText = 'Visit Website';

  const a = document.createElement('a');
  a.href = url;
  a.appendChild(strong);

  return a;
}

document.getElementById("addButton").onclick = function onAddClick() {
  const state = prompt("Enter the two-letter abbreviation for your state (AL, MO, etc.)");
  if (!state) {
    return;
  }
  const newCards = allCards.filter(
    card => card.state.toLowerCase() === state.toLowerCase()
  );
  if (newCards.length < 1) {
    alert("unable to find any senators from " + state);
    return;
  }
  addCards(newCards);
}

