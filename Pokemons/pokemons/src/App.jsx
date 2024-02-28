import './styles/App.css';
import {fetchPokemons} from "./localUtils";
import {useEffect, useState} from "react";
import Card from "./pages/details";
import {Route, Routes} from "react-router-dom";
import PokemonCard from "./components/PokemonCard";
import EmptySearchResult from "./components/EmptySearchResult";


function App(){
    return(
        <>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="details/:name" element={<Card/>} />
            </Routes>
        </>
    )
}

function MainPage() {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const handleChange = (event) => {
      setInputValue(event.target.value);
  }

  const handleClick = () => {
      setFilteredPokemons(pokemons.filter((pokemon) => pokemon.name.startsWith(inputValue.toLowerCase())));
  }

  useEffect(() => {
      setIsFetching(true);
      fetchPokemons()
          .then(pokemons => setPokemons(pokemons))
          .then(x => setIsFetching(false));
      }, []);

  useEffect(() => {
        setFilteredPokemons(pokemons);
    }, [pokemons]);

  let renderCondition = filteredPokemons.length === 0 && !isFetching;

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
              {renderCondition ? (
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

async function loadNextBatch(limit, current, offset){
    const pokemonUrls = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${current + offset}`)
        .then(response => response.json())
        .then(pokemon => pokemon.results.map(nameAndUrl => nameAndUrl.url));

    const fetchPromises = pokemonUrls.map(url => fetch(url)
        .then(response => response.json()));

    return await Promise.all(fetchPromises);
}

export default App;