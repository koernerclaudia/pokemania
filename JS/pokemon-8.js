//IIFE for Modal functionality
let modal = (function () {
    // defining the Modal to open across the whole screen
    let modalContainer = document.querySelector('#modal-container');
    
    // setting up function for the structure of the modal to have a title, text and an image
    function showModal(title, text, text2, img) {
        // Clear all existing modal content
        modalContainer.innerHTML = '';
        // creating a variable for div to be set up on the modal with relation to the css
        let modal = document.createElement('div');
        modal.classList.add('modal');

        // Add the new modal content -> Closing button and click function to hide the modal
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);
        
        // define the modal title to be H2
        let titleElement = document.createElement('h2');
        titleElement.innerText = title;
        
        // Define the modal text -> p
        let contentElement_height = document.createElement('p');
        contentElement_height.innerText = text;
        
        // Define the modal text -> p
        let contentElement_weight = document.createElement('p');
        contentElement_weight.innerText = text2;
        
        // Define the modal image characteristics
        let imageElement = document.createElement("img");
        imageElement.setAttribute("src", img);
        imageElement.setAttribute("width", "50%");
        imageElement.setAttribute("height", "50%");
        imageElement.setAttribute("alt", "Pokemon picture");

        // Construct the modal, adding the parts of the modal one after another
        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement_height);
        modal.appendChild(contentElement_weight);
        modal.appendChild(imageElement);
        modalContainer.appendChild(modal);

        // for the function 'showModal' the modal shall be visible
        modalContainer.classList.add('is-visible');
    }

    // Define the function 'hideModal'
    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

    return {
        showModal: showModal,
        hideModal: hideModal
    };
})();

//IIFE for Event Listeners for closing the modal
(function () {
    let modalContainer = document.querySelector('#modal-container');

    // Set up the action to close the modal by hitting escape
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            modal.hideModal();
        }
    });

    // Close if the user clicks directly on the overlay /anywhere on the page
    modalContainer.addEventListener('click', (e) => {
        if (e.target === modalContainer) {
            modal.hideModal();
        }
    });
})();

// Function to capitalize the first letter of a name
function capitalizeFirstLetter(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

//IIFE for API interactions
let pokemonAPI = (function () {
    // defining the API source
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=80';

    // Function to load the list, fetch the API and return the response in JSON format.
    // 'Unpack' the JSON format and get the result for each Pokemon - name and Details.
    // If fetching the API does not work, return an error (catch function).
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

    // Function to load the details of a specific Pokemon
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.weight = details.weight;
            item.types = details.types.map((typeInfo) => typeInfo.type.name).join(', ');
            item.abilities = details.abilities.map((abilityInfo) => abilityInfo.ability.name).join(', ');
    
            // Show the modal with the loaded details
            modal.showModal(capitalizeFirstLetter(item.name), 'Height: ' + details.height + '0cm', 'Weight: ' + details.weight + 'kg', details.sprites.front_default);
        }).catch(function (e) {
            console.error(e);
        });
    }
    

    return {
        loadList: loadList,
        loadDetails: loadDetails
    };
})();

//IIFE for Pokemon Repository
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
        let pokemonList = document.querySelector(".pokemon-list");
        // create the Pokemon objects as unordered list items
        let listpokemon = document.createElement("li");
        // turn the list items into a button
        let button = document.createElement("button");
        // showing the relevant Pokemon's name on the button with the first letter capitalized
        button.innerText = capitalizeFirstLetter(pokemon.name);
        // referencing the CSS of the button
        button.classList.add("button");
        // add the button as a child to the list item
        listpokemon.appendChild(button);
        // build the list - add the list item to the unordered list
        pokemonList.appendChild(listpokemon);
        // Make the button clickable to show the modal -> details of the Pokemon
        button.addEventListener("click", function() {
            showDetails(pokemon);
        });
    }
    

    function showDetails(pokemon) {
        pokemonAPI.loadDetails(pokemon);
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
