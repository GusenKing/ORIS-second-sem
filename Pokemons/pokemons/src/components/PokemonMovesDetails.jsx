import PokemonMoveCard from "./PokemonMoveCard";

function PokemonMovesDetails(moves){
    return(
        <>
            <p>Moves</p>
            <div className="moves-cards-container">
                {moves.slice(0, 9).map(moveInfo => PokemonMoveCard(moveInfo))}
            </div>
        </>
    )
}

export default PokemonMovesDetails;