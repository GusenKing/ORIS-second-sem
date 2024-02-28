export async function fetchPokemons() {
    const pokemonUrls = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50') //limit 1075
        .then(response => response.json())
        .then(pokemon => pokemon.results.map(nameAndUrl => nameAndUrl.url));

    const fetchPromises = pokemonUrls.map(url => fetch(url)
        .then(response => response.json()));

    return await Promise.all(fetchPromises);
}

export function getPokemonCode(id){
    return (id.length >= 3) ? id : (new Array(3).join('0') + id).slice(-3);
}

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function hectoKgToLbs(hectoKg) {
    return hectoKg / 10 * 2.2046;
}


export function toFeet(dm) {
    let totalInches = (dm * 10 * 0.393700);
    let inches = Math.round(totalInches % 12);
    let feet = Math.floor(totalInches / 12);
    if (inches === 12) {
        feet += 1;
        inches = 0;
    }
    return feet + '\'' + inches + '"';
}