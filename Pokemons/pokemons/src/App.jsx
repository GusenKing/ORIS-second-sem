import './styles/App.css';
import {fetchPokemons} from "./localUtils";
import {useEffect, useRef, useState} from "react";
import Card from "./pages/details";
import {Route, Routes} from "react-router-dom";
import PokemonCard from "./components/PokemonCard";
import EmptySearchResult from "./components/EmptySearchResult";


function App(){
    return(
        <>
            <Routes>
                <Route path={"/"} element={<MainPage/>}/>
                <Route path={"/details/:name"} element={<Card/>} />
            </Routes>
        </>
    )
}

function MainPage() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsNameUrls, setPokemonsNameUrls] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const [isFetchingPage, setIsFetchingPage] = useState(false);
  const [isInSearch, setIsInSearch] = useState(false);
  const [lastLoadedPokemonId, setLastLoadedPokemonId] = useState(30);
  const listInnerRef = useRef();

  const handleChange = (event) => {
      setInputValue(event.target.value);
  }

  const searchFilter = (pokemons) =>
      pokemons.filter((pokemon) => pokemon.name.startsWith(searchQuery));

  const handleClick = () => {
      setSearchQuery(inputValue.toLowerCase());
      if (inputValue === ""){
          setIsInSearch(false);
      }
      else{
          setIsInSearch(true);
          fetchForSearch(inputValue.toLowerCase());
      }
  }

  const fetchForSearch = (localSearchQuery) => {
      const filteredPokemons = pokemonsNameUrls.filter(nameUrl =>
          nameUrl.name.startsWith(localSearchQuery));

      const alreadyLoadedNames = pokemons.map(pokemonData => pokemonData.name);

      const pokemonsToFetch = filteredPokemons.filter(nameUrl =>
          !alreadyLoadedNames.includes(nameUrl.name));

      if (pokemonsToFetch.length === 0) return;

      const arrayOfPromises = pokemonsToFetch.map(nameUrl => fetch(nameUrl.url)
          .then(response => response.json()));

      Promise.all(arrayOfPromises)
          .then(fetchedData =>
              setPokemons(pokemons.concat(fetchedData)));
  }

  const handleScroll = () => {
      if (listInnerRef.current) {
          const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
          if ((scrollTop + clientHeight === scrollHeight || scrollTop + clientHeight >= (scrollHeight - 50)) &&
              !isInSearch &&
              !isFetchingPage) {
              setIsFetchingPage(true);
              loadPokemonBatch(pokemonsNameUrls.slice(lastLoadedPokemonId, lastLoadedPokemonId + 30))
                  .then(pokemonBatch => setPokemons(pokemons.concat(pokemonBatch)))
                  .then(() => setIsFetchingPage(false));
              setLastLoadedPokemonId(lastLoadedPokemonId + 30);
          }
      }
  }

    useEffect(() => {
        fetchPokemons()
            .then(pokemons => setPokemons(pokemons))
            .then(() => setIsFetching(false));
        fetchAllPokemonsInfo()
            .then(pokemonsUrls => setPokemonsNameUrls(pokemonsUrls.results));
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "scroll";
        };
    }, []);

  let renderCondition = !isFetching && searchFilter(pokemons).length === 0;

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
          <div className="content" onScroll={handleScroll} ref={listInnerRef} style={{
              overflowY: "scroll", height: "80vh"
          }}>
              {renderCondition ? (
                  <EmptySearchResult />
              ) : (
                  <div className="pokemon-grid">
                      {searchFilter(pokemons).map((pokemon) => (<PokemonCard pokemon={pokemon}/>))}
                  </div>
              )}
          </div>
      </div>
  );
}

async function fetchAllPokemonsInfo() {
    return await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
        .then(response => response.json());
}

async function loadPokemonBatch(pokemonUrls){
    const fetchPromises = pokemonUrls.map(urls => fetch(urls.url)
        .then(response => response.json()));

    return await Promise.all(fetchPromises);
}

export default App;