using CovidVaccineCard.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class VaccineCardsController : ControllerBase
{
    private readonly AppDbContext _context;

    public VaccineCardsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<VaccineCard>>> GetVaccineCards()
    {
        return await _context.VaccineCards.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<VaccineCard>> GetVaccineCard(int id)
    {
        var vaccineCard = await _context.VaccineCards.FindAsync(id);

        if (vaccineCard == null)
        {
            return NotFound();
        }

        return vaccineCard;
    }

    [HttpPost]
    public async Task<ActionResult<VaccineCard>> CreateVaccineCard([FromBody] VaccineCard vaccineCard)
    {
        if (vaccineCard == null)
        {
            return BadRequest("Vaccine card data is required.");
        }

        _context.VaccineCards.Add(vaccineCard);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetVaccineCard), new { id = vaccineCard.VaccineCardID }, vaccineCard);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateVaccineCard(int id, [FromBody] VaccineCard vaccineCard)
    {
        if (id != vaccineCard.VaccineCardID)
        {
            return BadRequest();
        }

        _context.Entry(vaccineCard).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteVaccineCard(int id)
    {
        var vaccineCard = await _context.VaccineCards.FindAsync(id);
        if (vaccineCard == null)
        {
            return NotFound();
        }

        _context.VaccineCards.Remove(vaccineCard);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
