import {capitalizeFirstLetter, typeColors} from "../localUtils";
import {useEffect, useState} from "react";
import {type} from "@testing-library/user-event/dist/type";

function PokemonMoveCard(moveInfo){
    const [typeName, setTypeName] = useState("");
    const [moveCardStyle, setMoveCardStyle] = useState({backgroundColor: ""});

    useEffect(() => {
        getMoveType(moveInfo.move.url)
            .then(moveTypeName => setTypeName(moveTypeName))
    }, []);

    useEffect(() => {
        setMoveCardStyle({backgroundColor: typeColors[typeName]});
    }, [typeName])

    return(
        <div className="pokemon-move-card" style={moveCardStyle}>
            <img alt="type icon" src={`/Types/${capitalizeFirstLetter(typeName)}.png`}></img>
            <p>{capitalizeFirstLetter(moveInfo.move.name)}</p>
        </div>
    )
}

async function getMoveType(moveUrl){
    return await fetch(moveUrl)
        .then(response => response.json())
        .then(moveInfo => moveInfo.type.name);
}

export default PokemonMoveCard;