using PokemonAPI.Models;

namespace PokemonAPI.Services;

public class PokeApiService
{
    private HttpClient _client;

    public PokeApiService(HttpClient client)
    {
        _client = client;
    }

    public Pokemon GetPokemon()
    {
        
    }
}