let PokemonRepository = (function () {
    let pokemonList = [
        {
            name: 'Bulbasaur', height: 0.7, type:['grass', 'poison'], weight: 6.9
        },
        { name: 'Pikachu', height: 0.4, type:'electric', weight: 6}
    ]

function getAll () {
    return pokemonList;
}

return {
    getAll: getAll
}


})()

console.log(PokemonRepository.getAll())
document.write(PokemonRepository.getAll())