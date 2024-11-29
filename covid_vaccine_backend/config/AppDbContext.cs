using CovidVaccineCard.Models;
using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public DbSet<Customer> Customers { get; set; }  
    public DbSet<Shop> Shops { get; set; }
    public DbSet<VaccineCard> VaccineCards { get; set; }
    public DbSet<Visit> Visits { get; set; }
    public DbSet<Province> Provinces { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

}
