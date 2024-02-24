import './styles/App.css';
import {getPokemonCode, capitalizeFirstLetter} from "./localUtils";
import {useEffect, useState} from "react";
import Card from "./pages/details";
import {Link, Route, Routes} from "react-router-dom";
import TypeLabel from "./components/TypeLabel";


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

function PokemonCard(props) {
    const pokemonInfo = props.pokemon;
    const pokemonImg = pokemonInfo.sprites.other.home.front_default;
    return(
        <Link to={`details/${pokemonInfo.name}`} style={{textDecoration: "none", color: "inherit"}}>
            <div className="pokemon-card">
                <div className="pokemon-name-id">
                    <span>{capitalizeFirstLetter(pokemonInfo.name)}</span>
                    <span>#{getPokemonCode(pokemonInfo.id.toString())}</span>
                </div>
                <img className="pokemon=sprite" src={pokemonImg} alt={pokemonInfo.name}/>
                <div className="type-labels">
                    {pokemonInfo.types.map(typeSlot => <TypeLabel key={typeSlot.slot} type={typeSlot.type.name}/>)}
                </div>
            </div>
        </Link>
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

async function fetchPokemons() {
    const pokemonUrls = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50') //limit 1075
        .then(response => response.json())
        .then(pokemon => pokemon.results.map(nameAndUrl => nameAndUrl.url));

    const fetchPromises = pokemonUrls.map(url => fetch(url)
        .then(response => response.json()));

    return await Promise.all(fetchPromises);
}

export default App;