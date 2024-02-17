import './App.css';
import {useEffect, useState} from "react";

function App() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() =>
  {
      fetchKantoPokemon();
      }, []);
        return (
      <>
      </>
);
}

function PokemonCard(props){
    return(
        <>
            <p>{}</p>
        </>
    );
}

function fetchKantoPokemon()
{
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
        .then(response => response.json())
        .then(function(allpokemon){
            allpokemon.results.forEach(function(pokemon){
                fetchPokemonData(pokemon);
            })
        })
}

function fetchPokemonData(pokemon){
    let url = pokemon.url;
    fetch(url)
        .then(response => response.json())
        .then(function(pokemonData){
            console.log(pokemonData)
        })
}


export default App;
