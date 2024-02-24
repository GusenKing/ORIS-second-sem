function PokemonStatsBar(title, value){
    return(
        <>
            <div>{title}</div>
            <progress value={value} max={100}></progress>
        </>
    )
}

export default PokemonStatsBar;