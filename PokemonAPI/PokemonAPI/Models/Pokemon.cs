namespace PokemonAPI.Models;

public class Pokemon
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Url { get; set; }
    public BreedingInfo BreedingInfo { get; set;}
}