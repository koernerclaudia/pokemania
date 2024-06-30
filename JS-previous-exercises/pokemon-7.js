
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=15';

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon,
      "detailsUrl" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      // console.log("pokemon is not correct");
    }
  }
  function getAll() {
    return pokemonList;
  }
  function addListItem(pokemon){
    //reference the CSS class from the HTML to build an unordered list
    let pokemonList = document.querySelector(".pokemon-list");
    // create the Pokemon ojbects as unordered list items
    let listpokemon = document.createElement("li");
    // turn the list itmes into a button
    let button = document.createElement("button");
    // showing the relevant Pokemon's name on the button
    button.innerText = pokemon.name;
    // referencing the CSS of the button
    button.classList.add("button");
    // add the button as a child to the list item
    listpokemon.appendChild(button);
    // build the list - add the list item to the unordered list
    pokemonList.appendChild(listpokemon);
    button.addEventListener("click", function(event) {
      showDetails(pokemon);
    });
      
    
  }


function loadList() {
  return fetch(apiUrl).then(function (response) {
    return response.json();
  }).then(function (json) {
    json.results.forEach(function (item) {
      let pokemon = {
        name: item.name,
        detailsUrl: item.url
      };
      add(pokemon);
      // console.log(pokemon)
    });
  }).catch(function (e) {
    console.error(e);
  })
}
function loadDetails(item) {
  let url = item.detailsUrl;
  return fetch(url).then(function (response) {
    return response.json();
  }).then(function (details) {
    // Now we add the details to the item
    item.imageUrl = details.sprites.front_default;
    item.height = details.height;
    item.weight = details.weight;
    item.types = details.types;
    item.abilities = details.abilities;
  }).catch(function (e) {
    console.error(e);
  });
}

function showDetails(pokemon) {
  loadDetails(pokemon).then(function () {
    console.log(pokemon);
  });
}

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();


pokemonRepository.loadList().then(function() {
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
});

// { name: 'Bulbasaur', height: 0.7, typeof:['grass', 'poison'], weight: 6.9},
    // { name: 'Pikachu', height: 0.4, typeof:'electric', weight: 6},
    // { name: 'Charizard', height: 1.7, typeof:['fire', ' flying'], weight: 90.5},
    // { name: 'Squirtle', height: 0.5, typeof:'water', weight: 9},
    // { name: 'Jigglypuff', height: 0.5, typeof:['normal', 'fairy'], weight: 5.5},
