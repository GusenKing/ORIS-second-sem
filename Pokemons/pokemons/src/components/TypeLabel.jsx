import {capitalizeFirstLetter, typeColors} from "../localUtils";

function TypeLabel(props){
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