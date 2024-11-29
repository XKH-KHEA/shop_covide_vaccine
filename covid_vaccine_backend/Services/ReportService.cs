using CovidVaccineCard.Models;
using Microsoft.EntityFrameworkCore;

namespace CovidVaccineCardSystem.Services
{
    public class ReportService
    {
        private readonly AppDbContext _context;

        public ReportService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<ProvinceReport>> GetProvinceVaccinationReport()
        {
            var report = await _context.Visits
                .Include(v => v.Province)
                .Include(v => v.VaccineCard)
                .GroupBy(v => v.Province.ProvinceName)
                .Select(g => new ProvinceReport
                {
                    Province =  g.Key,
                    TotalDoses = g.Max(v => v.VaccineCard.DosesReceived),
                    TotalVisitors = g.Count(),
                    CardTypeCount = g.GroupBy(v => v.VaccineCard.CardType)
                                     .Select(c => new CardTypeCount
                                     {
                                         CardType = c.Key,
                                         Count = c.Count()
                                     })
                                     .ToList()
                })
                .ToListAsync();

            return report;
        }
    }

    public class ProvinceReport
    {
        public string Province { get; set; }
        public List<Provining> Provining { get; set; }

        public int TotalDoses { get; set; }
        public int TotalVisitors { get; set; }
        public List<CardTypeCount> CardTypeCount { get; set; }
    }

    public class CardTypeCount
    {
        public string CardType { get; set; }
        public int Count { get; set; }
    }
    public class Provining
    {
        public string ProvineName { get; set; }
        public int Count { get; set; }
        // g.GroupBy(v => v.Province.ProvinceName).Select(c => new Provining { ProvineName = c.Key, Count = c.Count() }).ToList(),
    }
}
