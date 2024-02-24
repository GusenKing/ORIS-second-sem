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
      setFilteredPokemons(pokemons.filter((pokemon) => pokemon.name.startsWith(inputValue.toLowerCase())));
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
                      <img alt="search"
                           src="https://drive.google.com/thumbnail?id=1KJmZc874kQMiv25RC8zsSEy_svH-Qvoq&sz=w1000"/>
                      <input type="text" onChange={handleChange} placeholder="E.g. Pikachu"/>
                      <button onClick={handleClick} onKeyDown={handleClick}>GO</button>
                  </div>
              </div>
              <img className="pokeball-image" alt="pokeball"
                   src="https://drive.google.com/thumbnail?id=1BPJYKpjknOwDCagb0dRgY49ILbG2K1px&sz=w1000"/>
          </div>
          <div className="content">
              {filteredPokemons.length === 0 ? (
                  <EmptySearchResult />
              ) : (
                  <div className="pokemon-grid">
                      {filteredPokemons.map((pokemon) => (<PokemonCard pokemon={pokemon}/>))}
                  </div>
              )}
          </div>
      </div>
  );
}

function PokemonCard(props) {
    const pokemonInfo = props.pokemon;
    const pokemonImg = pokemonInfo.sprites.other.home.front_default;
    return(
        <div className="pokemon-card">
            <div className="pokemon-name-id">
                <span>{capitalizeFirstLetter(pokemonInfo.name)}</span>
                <span>#{getPokemonCode(pokemonInfo.id)}</span>
            </div>
            <img className="pokemon=sprite" src={pokemonImg} alt={pokemonInfo.name}/>
            <div className="type-labels">
                {pokemonInfo.types.map(typeSlot => <TypeLabel key={typeSlot.slot} type={typeSlot.type.name}/>)}
            </div>
        </div>
    );
}

function TypeLabel(props){
    const typeColors = {
        "bug": "#059669",
        "dragon": "#2ec4b6",
        "grass": "#16c172",
        "steel": "#73e2a7",
        "dark": "#434649",
        "flying": "#8b9cad",
        "normal": "#c18cba",
        "ghost": "#9a54a1",
        "rock": "#63320b",
        "ground": "#885629",
        "fighting": "#c75000",
        "fire": "#ef271b",
        "electric": "#ffbf00",
        "poison": "#6e44ff",
        "psychic": "#db00b6",
        "fairy": "#ee4268",
        "water": "#4361ee",
        "ice": "#90e0ef"
    }
    const typeColor = {
        backgroundColor: typeColors[props.type]
    };

    return(
        <div className="pokemon-type-label" style={typeColor}>
            {capitalizeFirstLetter(props.type)}
        </div>
    );
}

function EmptySearchResult(){
    return(
        <div className="empty-results">
            <div>Oops! Try again.</div>
            <div>The pokemon you're looking for is a unicorn. It doesn't exist in the list.</div>
            <img alt="sad pikachu" src="https://www.orthrusonline.ru/static/images/p/nextgen/pikachupartner.png"/>
        </div>
    )
}


function getPokemonCode(id){
    return (id.length >= 3) ? id : (new Array(3).join('0') + id).slice(-3);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function fetchPokemons() {
    const pokemonUrls = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1075') //limit 1075
        .then(response => response.json())
        .then(pokemon => pokemon.results.map(nameAndUrl => nameAndUrl.url));

    const fetchPromises = pokemonUrls.map(url => fetch(url)
        .then(response => response.json()));

    return await Promise.all(fetchPromises);
}

export default App;
