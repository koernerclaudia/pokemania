// IIFE for Modal functionality
let modal = (function () {
    
    function showModal(item) {
        let modalTitle = $(".modal-title");
        let modalBody = $(".modal-body");
        modalTitle.empty();
        modalBody.empty();

        let capitalizedTitle = capitalizeFirstLetter(item.name);
        let titleElement = $('<h1 style="font-family:Pokemon Solid">' + capitalizedTitle + '</h1>');
        let imageElement = $('<img class="modal-img" style="width:45%">');
        imageElement.attr("src", item.imageUrl);
        let heightElement = $("<p>" + "Height: " + item.height + "0 cm" + "</p>");
        let weightElement = $("<p>" + "Weight: " + item.weight + " kg" + "</p>");
        let typesElement = $("<p>" + "Types: " + item.types + "</p>");
        let abilitiesElement = $("<p>" + "Abilities: " + item.abilities + "</p>");

        modalTitle.append(titleElement);
        modalBody.append(imageElement);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
        modalBody.append(typesElement);
        modalBody.append(abilitiesElement);
   
        $('#exampleModal').modal('show');
    }

    return {
        showModal: showModal
    };
})();

// Function to capitalize the first letter of a name
function capitalizeFirstLetter(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

// IIFE for API interactions
let pokemonAPI = (function () {
    // defining the API source
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=80';

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                pokemonRepository.add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        });
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Add the details to the item
            item.imageUrl = details.sprites.other['official-artwork'].front_default;
            item.height = details.height;
            item.weight = details.weight;
            item.types = details.types.map((typeInfo) => typeInfo.type.name).join(', ');
            item.abilities = details.abilities.map((abilityInfo) => abilityInfo.ability.name).join(', ');
    
            // Show the modal with the loaded details
            modal.showModal(item);
        }).catch(function (e) {
            console.error(e);
        });
    }
    
    return {
        loadList: loadList,
        loadDetails: loadDetails
    };
})();

// IIFE for Pokemon Repository
let pokemonRepository = (function (modal, pokemonAPI) {
    // defining variables
    let pokemonList = [];

    // Function to let Pokemons be added to the list from the API
    function add(pokemon) {
        if (
            typeof pokemon === "object" &&
            "name" in pokemon &&
            "detailsUrl" in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log("pokemon is not correct");
        }
    }

    // Function to list all Pokemons; amount to show is defined in the link to the API
    function getAll() {
        return pokemonList;
    }

    // Function to create the layout of how the Pokemon list will be displayed
    function addListItem(pokemon) {
        // reference the CSS class from the HTML to build an unordered list
        let pokemonList = document.querySelector(".list-group");
        // create the Pokemon objects as unordered list items
        let listpokemon = document.createElement("li");
        listpokemon.classList.add('list-group-item');
        listpokemon.style.backgroundColor = 'transparent';
        listpokemon.style.border = 'none';
        // turn the list items into a button
        let button = document.createElement("button");
        button.innerText = capitalizeFirstLetter(pokemon.name);
        button.classList.add("btn");
        button.setAttribute('data-bs-toggle', 'modal');
        button.setAttribute('data-bs-target', '#exampleModal');
        // build the list - add the list item to the unordered list
      
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);

        // Make the button clickable to show the modal -> details of the Pokemon
        button.addEventListener("click", function() {
            showDetails(pokemon);
        });

    }

    function showDetails(item) {
        pokemonAPI.loadDetails(item);
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: pokemonAPI.loadList,
        loadDetails: pokemonAPI.loadDetails,
        showDetails: showDetails
    };
})(modal, pokemonAPI);

// Load the list of Pokemon and add each to the repository
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
