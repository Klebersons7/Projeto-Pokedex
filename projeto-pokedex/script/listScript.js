
const pokeContainer = document.querySelector("#pokeContainer");
const pokemonCount = 493;

const colors = {
  fire: '#FF8C00',
  grass: '#90EE90',
  electric: '#FFD700',
  water: '#6A5ACD',
  ground: '#DAA520',
  rock: '#B8860B',
  fairy: '#FFB6C1',
  poison: '#BA55D3',
  bug: '#228B22',
  dragon: '#97b3e6',
  psychic: '#DA70D6',
  flying: '#F5F5F5',
  fighting: '#A0522D',
  normal: '#F5F5F5' ,
  dark:  "#2F4F4F" ,
  ghost: "#9400D3" ,
  ice: "#87CEEB"
};

const mainTypes = Object.keys(colors);

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemonCount; i++) {
    await getPokemons(i);
  }
};

const getPokemons = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const resp = await fetch(url);
  const data = await resp.json();
  createPokemonCard(data);
};

const createPokemonCard = (poke) => {
  const card = document.createElement('div');
  card.classList.add("pokemon");
  const name = poke.name[0].toUpperCase() + poke.name.slice(1);
  const id = poke.id.toString().padStart(3, '0');

  const pokeTypes = poke.types.map(type => type.type.name);
  const type = mainTypes.find(type => pokeTypes.indexOf(type) > -1);
  const color = colors[type];

  card.style.backgroundColor = color;

  const pokemonInnerHTML = `
    <div class="imageContainer">
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}">
    </div>
    <div class="info">
      <span class="number">${id}</span>
      <h3 class="name">${name}</h3>
      <small class="type">Type: <span>${type}</span></small>
    </div>
  `;

  card.innerHTML = pokemonInnerHTML;
  pokeContainer.appendChild(card);
};

fetchPokemons();
