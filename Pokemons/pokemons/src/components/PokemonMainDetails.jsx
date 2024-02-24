import "../styles/PokemonDetails.css"
import {getPokemonCode, capitalizeFirstLetter} from "../localUtils";
import TypeLabel from "./TypeLabel";
import PokemonStatsBar from "./PokemonStatsBar";
import PokemonBreedingDetails from "./PokemonBreedingDetails";

function PokemonMainDetails(props){
    const pokemonInfo = props.pokemonInfo;
    const pokemonImg = pokemonInfo.sprites.other.home.front_default;

    return(
        <div className="blocks-wrapper">
            <div className="info-block">
                <div>#{getPokemonCode(pokemonInfo.id)}</div>
                <div>{capitalizeFirstLetter(pokemonInfo.name)}</div>
                <div className="type-labels">
                    {pokemonInfo.types.map(typeSlot => <TypeLabel key={typeSlot.slot} type={typeSlot.type.name}/>)}
                </div>
                {pokemonInfo.stats.map(statInfo => PokemonStatsBar(statInfo.stat.name, statInfo.base_stat))}
                <img className="pokemon=sprite" src={pokemonImg} alt={pokemonInfo.name}/>
            </div>
            <div className="breeding-block">
                {PokemonBreedingDetails(pokemonInfo.height, pokemonInfo.weight)}
            </div>
        </div>
    )
}

export default PokemonMainDetails;