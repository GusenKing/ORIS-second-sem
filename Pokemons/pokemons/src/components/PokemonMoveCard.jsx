import {capitalizeFirstLetter} from "../localUtils";

function PokemonMoveCard(moveName){
    return(
        <div className="pokemon-move-card">
            <p>{capitalizeFirstLetter(moveName)}</p>
        </div>
    )
}

export default PokemonMoveCard;