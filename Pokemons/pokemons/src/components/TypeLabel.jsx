import {capitalizeFirstLetter} from "../localUtils";

function TypeLabel(props){
    const typeColors = {
        "bug": "#059669",
        "dragon": "#2ec4b6",
        "grass": "#16c172",
        "steel": "#73e2a7",
        "dark": "#434649",
        "flying": "#8b9cad",
        "normal": "#c18cba",
        "ghost": "#9a54a1",
        "rock": "#63320b",
        "ground": "#885629",
        "fighting": "#c75000",
        "fire": "#ef271b",
        "electric": "#ffbf00",
        "poison": "#6e44ff",
        "psychic": "#db00b6",
        "fairy": "#ee4268",
        "water": "#4361ee",
        "ice": "#90e0ef"
    }
    const typeColor = {
        backgroundColor: typeColors[props.type]
    };

    return(
        <div className="pokemon-type-label" style={typeColor}>
            {capitalizeFirstLetter(props.type)}
        </div>
    );
}

export default TypeLabel;