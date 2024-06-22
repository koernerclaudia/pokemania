// ================================ Part1 of Exercise 1.5

// let PokemonList = [
//     { name: 'Bulbasaur', height: 0.7, type:['grass', 'poison'], weight: 6.9},
//     { name: 'Pikachu', height: 0.4, type:'electric', weight: 6},
//     { name: 'Charizard', height: 1.7, type:['fire', 'flying'], weight: 90.5},
//     { name: 'Squirtle', height: 0.5, type:'water', weight: 9},
//     { name: 'Jigglypuff', height: 0.5, type:['normal', 'fairy'], weight: 5.5},
//     { name: 'Eevee', height: 1.2, type:[' ', ' '], weight: 0},

// ];

//     function myPokemons(pokemon) {
//       console.log(pokemon.name + ' is ' + pokemon.height + ' tall, is of type: ' + pokemon.type + ' and weighs ' + pokemon.weight + 'kg.');
//       document.write(pokemon.name + " is " + pokemon.height + " tall, is of type: " + pokemon.type + " and weighs " + pokemon.weight + "kg.<p></p>");
//     }
//     PokemonList.forEach(myPokemons);

// ================================ End of Part1

// ================================ Part2 of Exercise 1.5

// let pokemonRepository = (function () {
//     let PokemonList = [
//     { name: 'Bulbasaur', height: 0.7, typeof:['grass', 'poison'], weight: 6.9},
//     { name: 'Pikachu', height: 0.4, typeof:'electric', weight: 6},
//     { name: 'Charizard', height: 1.7, typeof:['fire', ' flying'], weight: 90.5},
//     { name: 'Squirtle', height: 0.5, typeof:'water', weight: 9},
//     { name: 'Jigglypuff', height: 0.5, typeof:['normal', 'fairy'], weight: 5.5},
//     { name: 'Eevee', height: 1.2, type:[' ', ' '], weight: 0}
//   ]

//     function getAll () {
//       return PokemonList;
//     }

//     function add(pokemon) {
//         PokemonList.push(pokemon);
//     }

//               return {
//                 add: add,
//                 getAll: getAll,
//             }
//           })()

//           function myPokemons(pokemon) {
//             console.log(pokemon.name + ' is ' + pokemon.height + ' tall, is of type: ' + pokemon.typeof + ' and weighs ' + pokemon.weight + 'kg.');
//             document.write(pokemon.name + " is " + pokemon.height + " tall, is of type: " + pokemon.typeof + " and weighs " + pokemon.weight + "kg.<p>===</p>");
//           }
//           pokemonRepository.add({name: 'Butterfree', height: 1.1, typeof:['bug', 'flying'], weight: 32})
//           pokemonRepository.getAll().forEach(myPokemons);

          // document.write(pokemonRepository.getAll())
          // console.log(pokemonRepository.getAll())
          // console.log(pokemonRepository.getAll())
          // document.write(pokemonRepository.getAll())

// ================================ End of Part2

// ================================ Bonus task Exercise 1.5

let pokemonRepository = (function () {
  let PokemonList = [
  { name: 'Bulbasaur', height: 0.7, typeof:['grass', 'poison'], weight: 6.9},
  { name: 'Pikachu', height: 0.4, typeof:'electric', weight: 6},
  { name: 'Charizard', height: 1.7, typeof:['fire', ' flying'], weight: 90.5},
  { name: 'Squirtle', height: 0.5, typeof:'water', weight: 9},
  { name: 'Jigglypuff', height: 0.5, typeof:['normal', 'fairy'], weight: 5.5},
  { name: 'Eevee', height: 1.2, typeof:[' ', ' '], weight: 0}
]

function getAll() {
  return PokemonList;
}

function add(pokemon) {
  const expectedKeys = ['name', 'height', 'typeof', 'weight'];
  
  if (typeof pokemon === 'object' && pokemon !== null) {
    const pokemonKeys = Object.keys(pokemon);
    const hasAllKeys = expectedKeys.every(key => pokemonKeys.includes(key)) && pokemonKeys.length === expectedKeys.length;
    
    if (!hasAllKeys) {
      console.log('Error: The Pokémon object does not have the correct keys.');
      return;
    }

    if (!Array.isArray(pokemon.typeof) && typeof pokemon.typeof !== 'string') {
      console.log('Error: The typeof property must be an array or a string.');
    } else {
      PokemonList.push(pokemon);
    }
  } else {
    console.log('The parameter passed is not an object and cannot be added to the list.');
  }
}

return {
  add: add,
  getAll: getAll
};
})();

        function myPokemons(pokemon) {
          console.log(pokemon.name + ' is ' + pokemon.height + ' tall, is of type: ' + pokemon.typeof + ' and weighs ' + pokemon.weight + 'kg.');
          document.write(pokemon.name + " is " + pokemon.height + " tall, is of type: " + pokemon.typeof + " and weighs " + pokemon.weight + "kg.<p>===</p>");
        }
        
        document.write(pokemonRepository.getAll())
        pokemonRepository.add({name: 'Butterfree', height: 1.1, typeof:['bug', 'flying'], weight: 32})
        pokemonRepository.add({ name: 'Charmander', height: 0.6, type: ['fire'], weight: 8.5 }); 
      
        // pokemonRepository.add({ name: 'Lisa', height: 1.0, typeof: 123, weight: 20.0 });
        // pokemonRepository.getAll().forEach(myPokemons);

        // document.write(pokemonRepository.getAll())
        // console.log(pokemonRepository.getAll())
        // console.log(pokemonRepository.getAll())
        // document.write(pokemonRepository.getAll())


// ================================ End of Bonus of Exercise 1.5, 




// ================================ Code previous to Exercise 1.5


//   let pokemonRepository = (function () {
//     let pokemonList = []; // empty array
  
//     return {
//       add: function(pokemon) {
//         pokemonList.push(pokemon);
//       },
//       getAll: function() {
//         return pokemonList;
//       }
//     };
//   })();
  
//   console.log(pokemonRepository.getAll()); // []
//   pokemonRepository.add({ name: 'Pikachu' });
//   console.log(pokemonRepository.getAll()); // [ { name: 'Pikachu' } ]


//----------------------------------------------

  // PokemonList.forEach(function(pokemon) {
//     console.log(pokemon.name + ' is ' + pokemon.height + ' tall.<br>');
//     document.write(pokemon.name + ' is ' + pokemon.height + ' tall.<br>');
//   });

// Setting up the information for a number of Pokemons with their characteristics of name, height, weight and type. 
// Set up with a variable PokeMonList and as an array of objects.

// let bigThreshold = 1.0;
// let bigLabelGiven = false;
// // Setting up variables for the height threshold, proclaiming that if a Pokemon is taller than 1m it is big.
// // if it is smaller than 1m, the proclamaitin below will not be written/ logged.

// for (let i = 0; i < PokemonList.length; i++) {
//     let pokemon = PokemonList[i];
//     let output = "<div class='pokemon-item'><span class='pokemon-name'>" + pokemon.name + "</span> (height: <span class='pokemon-height'>" + pokemon.height + "m</span>)";

// output += "</div>";
// document.write(output + "<br>");
// }



    // The for loop to output the list of Pokemons and their characteristics using the integer (i) to list all of them in the object array. (using .length)

    // if (pokemon.height > bigThreshold && !bigLabelGiven) {
    //     output += " - <span class='big-note'>Wow, that’s big!</span>";
    //     bigLabelGiven = true;
    // }
// Conditional statement to call the Pokemon(s) with a height larger than 1m including some CSS to give this another colour.





// =================================================================

// Other possible solution listed from CF:

// let pokemonList = [
//     // pokemon objects
//     ];
    
//     for (let i = 0; i < pokemonList.length; i++){
//       // document.write("<p>" + pokemonList[i].name + "</p>");
//       // printing pokemonList[i]’s other details
//       // ...
//     }
   
// =================

// let PokemonList = [
//     { name: 'Bulbasaur', height: 0.7, type:['grass', 'poison'], weight: 6.9},
//     { name: 'Pikachu', height: 0.4, type:'electric', weight: 6},
//     { name: 'Charizard', height: 1.7, type:['fire', 'flying'], weight: 90.5},
//     { name: 'Squirtle', height: 0.5, type:'water', weight: 9},
//     { name: 'Jigglypuff', height: 0.5, type:['normal', 'fairy'], weight: 5.5},
//     { name: 'Eevee', height: 1.2, type:[' ', ' '], weight: 0},

// ];

// // for (let i = 0; i < PokemonList.length; i++) {
// //     let pokemon = PokemonList[i];
// //     document.write(pokemon.name + " " + pokemon.height + " " + pokemon.type + " <br>");
// // }

// let bigPokemon = 1.0;
// let bigLabelGiven = false;

// for (let i = 0; i < PokemonList.length; i++) {
//     let pokemon = PokemonList[i];
//     let output = pokemon.name + " (height: " + pokemon.height + "m)";
    
//     if (pokemon.height > bigPokemon && !bigLabelGiven) {
//         output += " - Wow, that is big!";
//         bigLabelGiven = true;
//     }
    
//     document.write(output + "<br>");
// }

// let firstPokemon = PokemonList[0];
// document.write("Name: " + firstPokemon.name + "<br>");
// document.write("Height: " + firstPokemon.height + "m<br>");
// document.write("Type: " + firstPokemon.type.join(', ') + "<br>");
// document.write("Weight: " + firstPokemon.weight + "kg<br>");

// let i = 0;
// document.write (PokemonList[i]);

// document.write(PokemonList.name + " " + PokemonList.height + "type" + "weight");

// let pokemons = "";
// let i = 0;
// for (;PokemonList[i];){
//     pokemons = pokemons + " " + pokemons[i];
//     i++;
// }
// document.write(PokemonList);
//   console.log(PokemonList);



// let veggies = ["tomato", "cucumber", "potato"];
// let text3 = "";
// let a = 0;
// for (;veggies[a];){
//   text3 = text3 + " " + veggies[a];
//   a++;
// }
// console.log(text3);

// let pokemon = {name:'Eevee', height: 1.8};

// if (pokemon.height > 1.5) {
//     console.log("This is a big Pokemon!")
// }
// else if (pokemon.height > 0.5 && pokemon.height < 1.5) {
//     console.log("This is a medium-size Pokemon!")
// }
// else {
//     console.log("This is a tiny Pokemon!")
// }



// Below the pokemonList array in your “scripts.js” file, create a for loop that iterates over each item in pokemonList:

// Use document.write() inside the loop’s code to write the Pokémon name on your website’s DOM.
// Use what you’ve learned about adding strings in JavaScript to write the Pokémon’s height next to its name, for example, “Bulbasaur (height: 7)”.

