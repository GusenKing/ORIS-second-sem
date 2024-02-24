import {hectoKgToLbs, toFeet} from "../localUtils"

function PokemonBreedingDetails(height, weight){
    return(
        <>
            <div>
                <p>Breeding</p>
                <div>
                    <p>Height</p>
                    <div>
                        {toFeet(height)}
                        {height / 10} m
                    </div>
                </div>
                <div>
                    <p>Weight</p>
                    <div>
                        {hectoKgToLbs(weight).toFixed(1)} lbs
                        {(weight / 10).toFixed(1)} kg
                    </div>
                </div>
            </div>
        </>
    )
}

export default PokemonBreedingDetails;