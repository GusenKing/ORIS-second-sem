import PokemonAbilityCard from "./PokemonAbilityCard";

function PokemonAbilitiesDetails(abilities){
    return(
        <>
            <p>Abilities</p>
            <div className="abilities-cards-container">
                {abilities.map(abilityInfo => PokemonAbilityCard(abilityInfo.ability.name))}
            </div>
        </>
    )
}

export default PokemonAbilitiesDetails;