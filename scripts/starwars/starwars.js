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

setStats(films);

function makeFilmInfo(film) {
    // Create a <div> to hold info for a single film.
    const resultDiv = document.createElement('div');

    // Add the "film-info" class to this <div>
    resultDiv.classList.add("film-info");

    resultDiv.appendChild(makePoster(film))

    resultDiv.appendChild(makeTitle(film));

    // Create button
    const button = document.createElement('button');
    button.type = 'button';
    button.innerText = 'More Info';
    resultDiv.appendChild(button);

    const infoDiv = document.createElement('div');
    infoDiv.id = "film-" + film.episode_id;
    infoDiv.classList.add('hidden');
    infoDiv.appendChild(makeInfoSection("Info:"));
    infoDiv.appendChild(makeInfoList(film));
    infoDiv.appendChild(makeInfoSection('Opening Crawl:'));
    infoDiv.appendChild(makeOpeningCrawl(film));
    infoDiv.appendChild(makeInfoSection('Main Characters:'));
    infoDiv.appendChild(makeCharacterList(film));
    resultDiv.appendChild(infoDiv);
    
    // Attach 'infoDiv' to button
    button.onclick = function() {
        infoDiv.classList.toggle('hidden');
    }

    return resultDiv;
}

function makePoster(film) {
    const img = document.createElement('img');
    img.src = `./images/poster-episode-${film.episode_id}.jpg`;

    return img;
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
//document.getElementById("addButton").onclick = 'makeInfoList(film)'
function makeInfoList(film) {
    let ul = document.createElement('ul');

    ul.appendChild(makeInfoListItem('Director', film.director));
    ul.appendChild(makeInfoListItem('Producer', film.producer));
    ul.appendChild(makeInfoListItem('Release Date', film.release_date));
    ul.appendChild(makeInfoListItem('box_office', numberWithCommas(film.box_office)));

    return ul;
}

function numberWithCommas(x, isMoney = true) {
    const symbol = isMoney ? '$' : '';
    return symbol + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

    for (let i=0; i < film.characters.length && i < 10; i++) {
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

function setStats(films) {
    const gross = films.reduce(
        (acc,curr) => acc + curr.box_office,
        0
    );

    document.getElementById('total-gross').innerText = numberWithCommas(gross);

    const planets = films.reduce(
        (acc,curr) => acc + curr.planets.length,
        0
    );

    document.getElementById('totalPlanets').innerText = numberWithCommas(planets, false);

    const starships = films.reduce(
        (acc,curr) => acc + curr.starships.length,
        0
    );

    document.getElementById('totalStarships').innerText = numberWithCommas(starships, false);

    const vehicles = films.reduce(
        (acc,curr) => acc + curr.vehicles.length,
        0
    );

    document.getElementById('totalVehicles').innerText = numberWithCommas(vehicles, false);

    const species = films.reduce(
        (acc,curr) => acc + curr.species.length,
        0
    );

    document.getElementById('totalSpecies').innerText = numberWithCommas(species, false);

}