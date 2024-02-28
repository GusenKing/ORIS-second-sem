import PokemonMoveCard from "./PokemonMoveCard";

function PokemonMovesDetails(moves){
    return(
        <>
            <p>Moves</p>
            <div className="moves-cards-container">
                {moves.map(moveInfo => PokemonMoveCard(moveInfo.move.name))}
            </div>
        </>
    )
}

export default PokemonMovesDetails;