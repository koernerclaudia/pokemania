let pokemonRepository = (function () {
    let repository = [
      { name: 'Bulbasaur', height: 0.7, typeof: ['grass', 'poison'], weight: 6.9 },
      { name: 'Pikachu', height: 0.4, typeof: 'electric', weight: 6 },
      { name: 'Charizard', height: 1.7, typeof: ['fire', 'flying'], weight: 90.5 },
      { name: 'Squirtle', height: 0.5, typeof: 'water', weight: 9 },
      { name: 'Jigglypuff', height: 0.5, typeof: ['normal', 'fairy'], weight: 5.5 },
    ];
  
    function add(pokemon) {
      if (
        typeof pokemon === "object" &&
        "name" in pokemon &&
        "height" in pokemon &&
        "types" in pokemon
      ) {
        repository.push(pokemon);
      } else {
        console.log("pokemon is not correct");
      }
    }
  
    function getAll() {
      return repository;
    }
  
    function addListItem(pokemon) {
      let pokemonList = document.querySelector(".pokemon-list");
      let listpokemon = document.createElement("li");
      let button = document.createElement("button");
      button.innerText = pokemon.name;
      button.classList.add("button-class");
      listpokemon.appendChild(button);
      pokemonList.appendChild(listpokemon);
  
      // Call the new function to add the event listener
      addClickListener(button, pokemon);
    }
  
    // New function to add event listener
    function addClickListener(button, pokemon) {
      button.addEventListener('click', function () {
        console.log(pokemon.name);
      });
    }
  
    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem
    };
  })();
  
  pokemonRepository.add({ name: "Pikachu", height: 0.3, types: ["electric"] });
  
  console.log(pokemonRepository.getAll());
  
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });