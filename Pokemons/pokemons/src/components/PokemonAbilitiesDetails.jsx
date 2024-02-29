import PokemonAbilityCard from "./PokemonAbilityCard";

function PokemonAbilitiesDetails(abilities){
    return(
        <>
            <p>Abilities</p>
            <div className="abilities-cards-container">
                {abilities.slice(0, 2).map(abilityInfo => PokemonAbilityCard(abilityInfo.ability.name))}
            </div>
        </>
    )
}

export default PokemonAbilitiesDetails;