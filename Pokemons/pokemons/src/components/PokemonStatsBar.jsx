import {capitalizeFirstLetter} from "../localUtils";
import "../styles/progressBarStyles.css"

function PokemonStatsBar(title, value){
    return(
        <div className={`${title}-bar`}>
            <div>{capitalizeFirstLetter(title)}</div>
            <progress value={value} max={100}></progress>
        </div>
    )
}

export default PokemonStatsBar;