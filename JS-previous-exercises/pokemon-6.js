//Just took the example from earlier in the #6 lesson to list all the Pokemon Objects as a button /
// turn them into list items.
let pokemonRepository = (function () {
  let repository = [
    { name: 'Bulbasaur', height: 0.7, typeof:['grass', 'poison'], weight: 6.9},
    { name: 'Pikachu', height: 0.4, typeof:'electric', weight: 6},
    { name: 'Charizard', height: 1.7, typeof:['fire', ' flying'], weight: 90.5},
    { name: 'Squirtle', height: 0.5, typeof:'water', weight: 9},
    { name: 'Jigglypuff', height: 0.5, typeof:['normal', 'fairy'], weight: 5.5},
    
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
    //this event listener logs the name of the relevant Pokemon to the Console, once the relevant button has been clicked.
    button.addEventListener('click', function (showDetails) {
      console.log(pokemon.name);
    });
//create a new function called showDetails
    function showDetails(pokemon){
      console.log(pokemon);
      
    
  }
    
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


