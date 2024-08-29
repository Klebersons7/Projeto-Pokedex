const search       = document.querySelector('#search');
const number       = document.querySelector('#number');
const pokemonImage = document.querySelector('#pokemon-image');
const types        = document.querySelector('#types');
const statNumber   = document.querySelectorAll('.stat-number');
const barInner     = document.querySelectorAll('.bar-inner');
const barOuter     = document.querySelectorAll('.bar-outer');
const statDesc     = document.querySelectorAll('.stat-desc');
const baseStats    = document.querySelector('#base-stats');
const pokedex      = document.querySelector('#pokedex');
const vBotao       = document.querySelector('#voltarBotao');
const pBotao       = document.querySelector('#proximoBotao');
const namePkm      = document.querySelector('#namePkm');
const listLink     = document.querySelector('.listLink');
const voltarBotao  = document.querySelector('#voltarBotao');
const proximoBotao = document.querySelector('#proximoBotao');
const SetaEsquerda = document.querySelector('#SetaEsquerda');
const SetaDireita  = document.querySelector('#SetaDireita');

const typeColors = {
    "rock":     [182, 158,  49],
    "ghost":    [112,  85, 155],
    "steel":    [183, 185, 208],
    "water":    [100, 147, 235],
    "grass":    [116, 203,  72],
    "psychic":  [251,  85, 132],
    "ice":      [154, 214, 223],
    "dark":     [117,  87,  76],
    "fairy":    [230, 158, 172],
    "normal":   [170, 166, 127],
    "fighting": [193,  34,  57],
    "flying":   [168, 145, 236],
    "poison":   [164,  62, 158],
    "ground":   [222, 193, 107],
    "bug":      [167, 183,  35],
    "fire":     [245, 125,  49],
    "electric": [249, 207,  48],
    "dragon":   [112,  55, 255]
}

let searchPokemon = 1; // Pokémon atual

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  } else {
    return null;
  }
}

const renderPokemon = async (pokemonId) => {
    namePkm.innerHTML = 'Loading...'
    number.innerHTML = '';

    const data = await fetchPokemon(pokemonId);

    if (data) {
        pokemonImage.style.display = 'block';
        namePkm.innerHTML = data.name;
        number.innerHTML = '#' + data.id.toString().padStart(3, '0');
        pokemonImage.src = data['sprites'].other.home['front_default'];
        
        // Atualizar a variável global de Pokémon atual
        searchPokemon = data.id;

        // Atualizar as cores baseadas no tipo do Pokémon
        const mainColor = typeColors[data.types[0].type.name];
        baseStats.style.color         = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;
        pokedex.style.backgroundColor = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;
        vBotao.style.backgroundColor = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;
        pBotao.style.backgroundColor = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;
        search.style.backgroundColor = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;
        listLink.style.backgroundColor = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;

        // Atualizar os tipos do Pokémon
        types.innerHTML = '';
        data.types.forEach((t) => {
            let newType = document.createElement('span');
            let color   = typeColors[t.type.name];

            newType.innerHTML = t.type.name;
            newType.classList.add('type');
            newType.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`; 
            types.appendChild(newType);
        });

        // Atualizar os stats e a barra de stats
        data.stats.forEach((s, i) => {
            statNumber[i].innerHTML = s.base_stat.toString().padStart(3, '0');
            barInner[i].style.width = `${s.base_stat}%`;
            barInner[i].style.backgroundColor = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;
            barOuter[i].style.backgroundColor = `rgba(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]}, 0.3)`;
            statDesc[i].style.color = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;
        });

    } else {
        pokemonImage.style.display = 'none';
        namePkm.innerHTML = 'Not found :c';
        number.innerHTML = '';
    }
}

// Pesquisa Pokémon ao mudar o campo de busca
search.addEventListener('change', async (event) => {
    const pokemon = event.target.value.toLowerCase();
    const data = await fetchPokemon(pokemon);

    if (data) {
        renderPokemon(data.id);
    } else {
        alert('Pokémon não encontrado!');
    }
});

// Navegar para o Pokémon anterior
voltarBotao.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1; 
        renderPokemon(searchPokemon);
    }
});

// Navegar para o próximo Pokémon
proximoBotao.addEventListener('click', async () => {
    const data = await fetchPokemon(searchPokemon + 1);
    if (data) {
        searchPokemon += 1;
        renderPokemon(searchPokemon);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('#search');

    // Função para limpar o texto placeholder quando o campo está focado
    searchInput.addEventListener('focus', () => {
        if (searchInput.placeholder) {
            searchInput.placeholder = '';
        }
    });

    // Função para restaurar o texto placeholder se o campo estiver vazio
    searchInput.addEventListener('blur', () => {
        if (!searchInput.value) {
            searchInput.placeholder = 'Pesquisar...';
        }
    });
});


// Renderizar Pokémon inicial
renderPokemon(searchPokemon);
