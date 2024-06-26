// ================================ Part2 of Exercise 1.5

let pokemonRepository = (function () {
    let PokemonList = [
    { name: 'Bulbasaur', height: 0.7, typeof:['grass', 'poison'], weight: 6.9},
    { name: 'Pikachu', height: 0.4, typeof:'electric', weight: 6},
    { name: 'Charizard', height: 1.7, typeof:['fire', ' flying'], weight: 90.5},
    { name: 'Squirtle', height: 0.5, typeof:'water', weight: 9},
    { name: 'Jigglypuff', height: 0.5, typeof:['normal', 'fairy'], weight: 5.5},
    { name: 'Eevee', height: 1.2, type:[' ', ' '], weight: 0}
  ]

    function getAll () {
      return PokemonList;
    }

    function add(pokemon) {
        PokemonList.push(pokemon);
    }

              return {
                add: add,
                getAll: getAll,
            }
          })()

          function myPokemons(pokemon) {
            console.log(pokemon.name + ' is ' + pokemon.height + ' tall, is of type: ' + pokemon.typeof + ' and weighs ' + pokemon.weight + 'kg.');
            document.write(pokemon.name + " is " + pokemon.height + " tall, is of type: " + pokemon.typeof + " and weighs " + pokemon.weight + "kg.<p>===</p>");
          }
          pokemonRepository.add({name: 'Butterfree', height: 1.1, typeof:['bug', 'flying'], weight: 32})
          pokemonRepository.getAll().forEach(myPokemons);

          document.write(pokemonRepository.getAll())
        

// ================================ End of Part2