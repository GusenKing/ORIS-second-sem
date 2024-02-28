import {Link} from "react-router-dom";
import {capitalizeFirstLetter, getPokemonCode} from "../localUtils";
import TypeLabel from "./TypeLabel";

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

export default PokemonCard;