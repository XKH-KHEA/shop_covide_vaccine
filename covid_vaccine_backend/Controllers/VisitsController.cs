using CovidVaccineCard.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class VisitsController : ControllerBase
{
    private readonly AppDbContext _context;

    public VisitsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Visit>>> GetVisits()
    {
        return await _context.Visits
            .Include(v => v.Customer)
            .Include(v => v.Shop)
            .Include(v => v.VaccineCard)
            .Include(v => v.Province)
            .ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Visit>> GetVisit(int id)
    {
        var visit = await _context.Visits
            .Include(v => v.Customer)
            .Include(v => v.Shop)
            .Include(v => v.VaccineCard)
            .Include(v => v.Province)
            .FirstOrDefaultAsync(v => v.VisitID == id);

        if (visit == null)
        {
            return NotFound();
        }

        return visit;
    }

    [HttpPost]
    public async Task<ActionResult<Visit>> CreateVisit([FromBody] Visit visit)
    {
        if (visit == null)
        {
            return BadRequest("Visit data is required.");
        }

        _context.Visits.Add(visit);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetVisit), new { id = visit.VisitID }, visit);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateVisit(int id, [FromBody] Visit visit)
    {
        if (id != visit.VisitID)
        {
            return BadRequest();
        }

        _context.Entry(visit).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteVisit(int id)
    {
        var visit = await _context.Visits.FindAsync(id);
        if (visit == null)
        {
            return NotFound();
        }

        _context.Visits.Remove(visit);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
