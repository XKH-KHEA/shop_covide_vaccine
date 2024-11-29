using CovidVaccineCard.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class ProvincesController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProvincesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Province>>> GetProvinces()
    {
        return await _context.Provinces.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Province>> GetProvince(int id)
    {
        var province = await _context.Provinces.FindAsync(id);

        if (province == null)
        {
            return NotFound();
        }

        return province;
    }

    [HttpPost]
    public async Task<ActionResult<Province>> CreateProvince([FromBody] Province province)
    {
        if (province == null)
        {
            return BadRequest("Province data is required.");
        }

        _context.Provinces.Add(province);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetProvince), new { id = province.ProvinceID }, province);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProvince(int id, [FromBody] Province province)
    {
        if (id != province.ProvinceID)
        {
            return BadRequest();
        }

        _context.Entry(province).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProvince(int id)
    {
        var province = await _context.Provinces.FindAsync(id);
        if (province == null)
        {
            return NotFound();
        }

        _context.Provinces.Remove(province);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
