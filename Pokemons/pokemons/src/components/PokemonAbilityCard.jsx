import {capitalizeFirstLetter} from "../localUtils";

function PokemonAbilityCard(abilityName){
    return(
        <div className="pokemon-ability-card">
            <div className="circle">
                <p>{capitalizeFirstLetter(abilityName)[0]}</p>
            </div>
            <p>{capitalizeFirstLetter(abilityName)}</p>
        </div>
    )
}

export default PokemonAbilityCard;