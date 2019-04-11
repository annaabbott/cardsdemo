import { films } from './films.js'
import { people } from './people.js';

films.sort(function (a,b) {
    return a.episode_id - b.episode_id;
});

const filmsDiv = document.getElementById('films');
for (let i = 0; i < films.length; i++) {
    const newDiv = makeFilmInfo(films[i]);
    filmsDiv.appendChild(newDiv);
}

function makeFilmInfo(film) {
    // Create a <div> to hold info for a single film.
    const resultDiv = document.createElement('div');

    // Set the id for the <div> to be "film-1", etc.
    resultDiv.id = "film-" + film.episode_id;

    // Add the "film-info" class to this <div>
    resultDiv.classList.add("film-info");

    resultDiv.appendChild(makeTitle(film));
    resultDiv.appendChild(makeInfoSection("Info:"));
    resultDiv.appendChild(makeInfoList(film));
    resultDiv.appendChild(makeInfoSection('Opening Crawl:'));
    resultDiv.appendChild(makeOpeningCrawl(film));
    resultDiv.appendChild(makeInfoSection('Main Characters:'));
    resultDiv.appendChild(makeCharacterList(film));

    return resultDiv;
}

function makeTitle(film) {
    // Header for film title.
    let h2 = document.createElement('h2');
    h2.innerText = `Episode ${film.episode_id}: ${film.title}`;

    return h2;
}

function makeInfoSection(title) {
    let h3 = document.createElement("h3");
    h3.innerText = title;

    return h3;
}

function makeInfoList(film) {
    let ul = document.createElement('ul');

    ul.appendChild(makeInfoListItem('Director', film.director));
    ul.appendChild(makeInfoListItem('Producer', film.producer));
    ul.appendChild(makeInfoListItem('Release Date', film.release_date));

    return ul;
}

function makeInfoListItem(label, value) {
    const li = document.createElement('li');

    const strong = document.createElement('strong');
    strong.innerText = label + ": ";
    li.appendChild(strong);
    
    li.appendChild(document.createTextNode(value));

    return li;
}

function makeOpeningCrawl(film) {
    const blockquote = document.createElement('blockquote');
    blockquote.innerText = film.opening_crawl;

    return blockquote;
}

function makeCharacterList(film) {
    const ul = document.createElement('ul');

    for (let i=0; i < film.characters.length && i < 12; i++) {
        ul.appendChild(makeCharacterListItem(film.characters[i]));
    }

    return ul;
}

function makeCharacterListItem(url) {
    const person = people.find(item => item.url === url);
    if (!person) {
        return;
    }

    const li = document.createElement('li');
    li.innerText = person.name;

    return li;
}












/*
let html = "";
for (let film of films) {
    html += `<div class="film-info">`;
    html += `  <h2>Episode ${film.episode_id}: ${film.title}</h2>`;
    html += `  <button id="film-${film.episode_id}">More Info</button>`;
    html += makeFilmInfo(film);
    html += `</div>`;
}

document.getElementById("films").innerHTML = html;

function makeFilmInfo(film) {
    let html = "";
    html += `<div id="info-${film.episode_id}">`;
    html += film.opening_crawl;
    html += `</div>`;

    return html;
}
*/


