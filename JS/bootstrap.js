// IIFE for Modal functionality
let modal = (function () {
    function showModal(item) {
      let modalTitle = $(".modal-title");
      let modalBody = $(".modal-body");
      modalTitle.empty();
      modalBody.empty();
  
      let titleElement = $("<h1>" + item.name + "</h1>");
      let imageElement = $('<img class="modal-img" style="width:50%">');
      imageElement.attr("src", item.imageUrl);
      let heightElement = $("<p>" + "Height: " + item.height + "0cm" + "</p>");
      let weightElement = $("<p>" + "Weight: " + item.weight + " kg" + "</p>");
  
      modalTitle.append(titleElement);
      modalBody.append(imageElement);
      modalBody.append(heightElement);
      modalBody.append(weightElement);
  
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
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;
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
    let pokemonList = [];
  
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
  
    function getAll() {
      return pokemonList;
    }
  
    function addListItem(pokemon) {
      let pokemonList = document.querySelector(".list-group");
      let listpokemon = document.createElement("li");
      listpokemon.classList.add('list-group-item');
      let button = document.createElement("button");
      button.innerText = capitalizeFirstLetter(pokemon.name);
      button.classList.add("btn", "btn-primary");
      button.setAttribute('data-bs-toggle', 'modal');
      button.setAttribute('data-bs-target', '#exampleModal');
      listpokemon.appendChild(button);
      pokemonList.appendChild(listpokemon);
  
      button.addEventListener("click", function() {
        pokemonRepository.loadDetails(pokemon);
      });
    }
  
    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: pokemonAPI.loadList,
      loadDetails: pokemonAPI.loadDetails,
      showDetails: pokemonAPI.loadDetails
    };
  })(modal, pokemonAPI);
  
  // Load the list of Pokemon and add each to the repository
  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });
  