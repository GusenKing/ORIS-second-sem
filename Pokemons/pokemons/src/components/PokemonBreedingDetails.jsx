import {hectoKgToLbs, toFeet} from "../localUtils"

function PokemonBreedingDetails(height, weight){
    return(
        <>
            <>
                <p>Breeding</p>
                <div className="breeding-info-container">
                    <div className="height-part">
                        <p>Height</p>
                        <div className="height-block">
                            <p>{toFeet(height)}</p>
                            <p>{height / 10} m</p>
                        </div>
                    </div>
                    <div className="weight-part">
                        <p>Weight</p>
                        <div className="weight-block">
                            <p>{hectoKgToLbs(weight).toFixed(1)} lbs</p>
                            <p>{(weight / 10).toFixed(1)} kg</p>
                        </div>
                    </div>
                </div>
            </>
        </>
    )
}

export default PokemonBreedingDetails;