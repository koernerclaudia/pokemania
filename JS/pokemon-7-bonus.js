let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=5';
  
    function add(pokemon) {
      if (
        typeof pokemon === "object" &&
        "name" in pokemon
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
      let pokemonList = document.querySelector(".pokemon-list");
      let listpokemon = document.createElement("li");
      let button = document.createElement("button");
      button.innerText = pokemon.name;
      button.classList.add("button");
      listpokemon.appendChild(button);
      pokemonList.appendChild(listpokemon);
      button.addEventListener("click", function(event) {
        showDetails(pokemon);
      });
    }
  
    function showLoadingMessage() {
      let loadingMessage = document.createElement('p');
      loadingMessage.innerText = 'Loading...';
      loadingMessage.classList.add('loading-message');
      document.body.appendChild(loadingMessage);
    }
  
    function hideLoadingMessage() {
      setTimeout(() => {
        let loadingMessage = document.querySelector('.loading-message');
        if (loadingMessage) {
          document.body.removeChild(loadingMessage);
        }
      }, 500); // Adjust the delay time as needed (500ms in this example)
    }
  
    function loadList() {
      showLoadingMessage();
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
          console.log(pokemon);
        });
        setTimeout(hideLoadingMessage, 5000); // Ensure the loading message is shown for at least 5000ms
      }).catch(function (e) {
        console.error(e);
        setTimeout(hideLoadingMessage, 500); // Ensure the loading message is shown for at least 500ms
      });
    }
  
    function loadDetails(item) {
      showLoadingMessage();
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types;
        item.abilities = details.abilities;
        setTimeout(hideLoadingMessage, 5000); // Ensure the loading message is shown for at least 500ms
      }).catch(function (e) {
        console.error(e);
        setTimeout(hideLoadingMessage, 500); // Ensure the loading message is shown for at least 500ms
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
  