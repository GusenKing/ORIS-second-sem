import "../styles/PokemonDetails.css"
import {getPokemonCode, capitalizeFirstLetter} from "../localUtils";
import TypeLabel from "./TypeLabel";
import PokemonStatsBar from "./PokemonStatsBar";
import PokemonBreedingDetails from "./PokemonBreedingDetails";
import PokemonMovesDetails from "./PokemonMovesDetails";
import PokemonAbilitiesDetails from "./PokemonAbilitiesDetails";

function PokemonMainDetails({ pokemonInfo }){
    const pokemonImg = pokemonInfo.sprites.other.home.front_default;

    return(
        <div className="blocks-wrapper">
            <div className="info-block">
                <div className="pokemon-name-id">
                    <div>#{getPokemonCode(pokemonInfo.id)}</div>
                    <div>{capitalizeFirstLetter(pokemonInfo.name)}</div>
                </div>
                <div className="details-type-labels">
                    {pokemonInfo.types.map(typeSlot => <TypeLabel key={typeSlot.slot} type={typeSlot.type.name}/>)}
                </div>
                <div className="bars-container">
                    {pokemonInfo.stats
                        .filter(statInfo => !["special-attack", "special-defense"].includes(statInfo.stat.name))
                        .map(statInfo => PokemonStatsBar(statInfo.stat.name, statInfo.base_stat))}
                </div>
                <div className="pokemon-sprite">
                    <img src={pokemonImg} alt={pokemonInfo.name}/>
                </div>
            </div>
            <div className="breeding-block">
                {PokemonBreedingDetails(pokemonInfo.height, pokemonInfo.weight)}
            </div>
            <div className="moves-block">
                {PokemonMovesDetails(pokemonInfo.moves)}
            </div>
            <div className="abilities-block">
                {PokemonAbilitiesDetails(pokemonInfo.abilities)}
            </div>
        </div>
    )
}

export default PokemonMainDetails;