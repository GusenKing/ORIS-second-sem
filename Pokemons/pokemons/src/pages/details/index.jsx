import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import PokemonMainDetails from "../../components/PokemonMainDetails";

function Card(){
    const [pokemonInfo, setPokemonInfo] = useState(null);
    const {name} = useParams();

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(response => response.json())
            .then(data => setPokemonInfo(data));
    }, [name]);

    if (!pokemonInfo)
        return(
            <>
            </>
        )

    return(
        <>
            <PokemonMainDetails pokemonInfo={pokemonInfo}/>
        </>
    )
}

export default Card;