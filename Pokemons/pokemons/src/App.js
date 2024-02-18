import './App.css';
import {useEffect, useState} from "react";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
      setInputValue(event.target.value);
  }

  const handleClick = () => {
      setFilteredPokemons(pokemons.filter((pokemon) => pokemon.name.startsWith(inputValue)));
  }

  useEffect(() => {
      fetchPokemons().then(pokemons => setPokemons(pokemons));
      }, []);
    useEffect(() => {
        setFilteredPokemons(pokemons);
    }, [pokemons]);

  return (
      <div className="page-wrapper">
          <div className="search-header">
              <div className="search">
                  <div className="header-text">Who are you looking for?</div>
                  <div className="search-field">
                      <input type="text" onChange={handleChange}/>
                      <button onClick={handleClick} onKeyDown={handleClick}>GO</button>
                  </div>
              </div>
              <img className="pokeball-image" alt="pokeball"
                   src="https://drive.google.com/thumbnail?id=1BPJYKpjknOwDCagb0dRgY49ILbG2K1px&sz=w1000"/>
          </div>
          <div className="pokemon-grid">
              {filteredPokemons.map((pokemon) => (<PokemonCard pokemon={pokemon}/>))}
          </div>
      </div>
);
}

function PokemonCard(props){
    const pokemonInfo = props.pokemon;
    const pokemonImg = pokemonInfo.sprites.front_default;
    return(
        <div className="pokemon-card">
            <div className="pokemon-name-id">
                <span>{pokemonInfo.name}</span>
                <span>{getPokemonCode(pokemonInfo.id)}</span>
            </div>
            <img className="pokemon=sprite" src={pokemonImg} alt={pokemonInfo.name}/>
            <div className="type-labels">
                {pokemonInfo.types.map(typeSlot => <TypeLabel key={typeSlot.slot} type={typeSlot.type.name}/>)}
            </div>
        </div>
    );
}

function TypeLabel(props){
    return(
        <div className="pokemon-type-label">
            {props.type}
        </div>
    );
}


function getPokemonCode(id){
    let initialString = "#";
    if (id < 10){
        return initialString + "00" + id;
    }
    if (id < 100)
        return initialString + "0" + id;

    return initialString + id.toString();
}

async function fetchPokemons() {
    const pokemonUrls = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1100')
        .then(response => response.json())
        .then(pokemon => pokemon.results.map(nameAndUrl => nameAndUrl.url));

    const fetchPromises = pokemonUrls.map(url => fetch(url)
        .then(response => response.json()));

    return await Promise.all(fetchPromises);
}

export default App;
