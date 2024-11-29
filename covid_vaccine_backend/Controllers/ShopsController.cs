using CovidVaccineCard.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class ShopsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ShopsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Shop>>> GetShops()
    {
        return await _context.Shops.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Shop>> GetShop(int id)
    {
        var shop = await _context.Shops.FindAsync(id);

        if (shop == null)
        {
            return NotFound();
        }

        return shop;
    }

    [HttpPost]
    public async Task<ActionResult<Shop>> CreateShop([FromBody] Shop shop)
    {
        if (shop == null)
        {
            return BadRequest("Shop data is required.");
        }

        _context.Shops.Add(shop);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetShop), new { id = shop.ShopID }, shop);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateShop(int id, [FromBody] Shop shop)
    {
        if (id != shop.ShopID)
        {
            return BadRequest();
        }

        _context.Entry(shop).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteShop(int id)
    {
        var shop = await _context.Shops.FindAsync(id);
        if (shop == null)
        {
            return NotFound();
        }

        _context.Shops.Remove(shop);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
