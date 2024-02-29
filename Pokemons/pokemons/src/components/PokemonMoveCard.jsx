import {capitalizeFirstLetter, typeColors} from "../localUtils";
import {useEffect, useState} from "react";

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
            <img alt="type icon" src={`${process.env.PUBLIC_URL}/Types/${capitalizeFirstLetter(typeName)}.png`}></img>
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