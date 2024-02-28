import {capitalizeFirstLetter} from "../localUtils";

function PokemonAbilityCard(abilityName){
    return(
        <div className="pokemon-ability-card">
            <p>{capitalizeFirstLetter(abilityName)}</p>
        </div>
    )
}

export default PokemonAbilityCard;