// ================================ Part1 of Exercise 1.5

let PokemonList = [
    { name: 'Bulbasaur', height: 0.7, type:['grass', 'poison'], weight: 6.9},
    { name: 'Pikachu', height: 0.4, type:'electric', weight: 6},
    { name: 'Charizard', height: 1.7, type:['fire', 'flying'], weight: 90.5},
    { name: 'Squirtle', height: 0.5, type:'water', weight: 9},
    { name: 'Jigglypuff', height: 0.5, type:['normal', 'fairy'], weight: 5.5},
    { name: 'Eevee', height: 1.2, type:[' ', ' '], weight: 0},

];

    function myPokemons(pokemon) {
      console.log(pokemon.name + ' is ' + pokemon.height + ' tall, is of type: ' + pokemon.type + ' and weighs ' + pokemon.weight + 'kg.');
      document.write(pokemon.name + " is " + pokemon.height + " tall, is of type: " + pokemon.type + " and weighs " + pokemon.weight + "kg.<p></p>");
    }
    PokemonList.forEach(myPokemons);


// ================================ End of Part1