using Microsoft.AspNetCore.Mvc;
using PokemonAPI.Models;

namespace PokemonAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PokemonController :ControllerBase
{
    [HttpGet]
    public IEnumerable<Pokemon> GetByFilter()
    {
        return new[] { new Pokemon(), new Pokemon() };
    }

    [HttpGet("{id}")]
    public Pokemon GetPokemonByIdOrName(int id)
    {
        return new Pokemon();
    }
}



