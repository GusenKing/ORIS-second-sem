import './App.css';
import {useEffect, useState} from "react";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const arr = [
      {
          name: "abc"
      },
      {
          name: "abc2"
      },
      {
          name: "abc3"
      }
  ]

  useEffect(() => {
        setPokemons(fetchKantoPokemon());
      }, []);
  return (
      <>
          <div>
              Pokemons
          </div>
          <div>
              {/*{arr.map((ob) => (<PokemonCard pokemon={ob}/>))}*/}
              {pokemons.map((pokemon) => (<PokemonCard key={pokemon.id} pokemon={pokemon}/>))}
          </div>
      </>
);
}

function PokemonCard(props){
    debugger;
    return(
        <>
            <p>{props.pokemon.name}</p>
        </>
    );
}

function fetchKantoPokemon(){
    let data = [];
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
        .then(response => response.json())
        .then(allpokemon => allpokemon.results.forEach(pokemon =>
            fetch(pokemon.url)
                .then(response => response.json())
                .then(pokemonData => data.push(pokemonData))));
    return data;
}


export default App;
