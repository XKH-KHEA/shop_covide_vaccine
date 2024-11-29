using CovidVaccineCard.Models;

namespace CovidVaccineCardSystem.Data
{
    public class DbSeeder
    {
        private readonly AppDbContext _context;

        public DbSeeder(AppDbContext context)
        {
            _context = context;
        }

        public void Seed()
        {
            if (!_context.Provinces.Any())
            {
                _context.Provinces.AddRange(new List<Province>
            {
                new Province { ProvinceName = "Phnom Penh" },
                new Province { ProvinceName = "Kandal" },
                new Province { ProvinceName = "Pursat" }
            });
                _context.SaveChanges();
            }

            if (!_context.Shops.Any())
            {
                _context.Shops.AddRange(new List<Shop>
            {
                new Shop { ShopName = "Shop A", Location = "Phnom Penh" },
                new Shop { ShopName = "Shop B", Location = "Phnom Penh" },
                new Shop { ShopName = "Shop C", Location = "Phnom Penh" }
            });
                _context.SaveChanges();
            }

            if (!_context.VaccineCards.Any())
            {
                _context.VaccineCards.AddRange(new List<VaccineCard>
                {
                    new VaccineCard
                    {
                        CardType = "MOH",
                        VaccinationDate = DateTime.Now.AddMonths(-2),
                        VaccineManufacturer = "Pfizer",
                        IsFullyVaccinated = true,
                        DosesReceived = 2,
                        MilitaryId = "MOD128", 
                        KhmerName = "ស៊ុន ដារ៉ា", 
                        EnglishName = "Son Dara", 
                        PassportNo = "P1234567890", 
                        PhoneNumber = "012345678"
                    },
                    new VaccineCard
                    {
                        CardType = "MOD",
                        VaccinationDate = DateTime.Now.AddMonths(-1),
                        VaccineManufacturer = "Sinovac",
                        IsFullyVaccinated = true,
                        DosesReceived = 2,
                        MilitaryId = "MOD123", 
                        KhmerName = "រីន ថីដា",
                        EnglishName = "Rin ThiDa",
                        PassportNo = "M987654321", 
                        PhoneNumber = "098765432"
                    },
                     new VaccineCard
                    {
                        CardType = "MOD",
                        VaccinationDate = DateTime.Now.AddMonths(-1),
                        VaccineManufacturer = "Sinovac",
                        IsFullyVaccinated = true,
                        DosesReceived = 4,
                        MilitaryId = "MOD124",
                        KhmerName = "វាន់​ សារ៉ា",
                        EnglishName = "Van Sara",
                        PassportNo = "M997654321",
                        PhoneNumber = "015067492"
                    },
                       new VaccineCard
                    {
                        CardType = "MOH",
                        VaccinationDate = DateTime.Now.AddMonths(-1),
                        VaccineManufacturer = "AstraZeneca",
                        IsFullyVaccinated = true,
                        DosesReceived = 4,
                        MilitaryId = "MOD127",
                        KhmerName = "ឌី ណា",
                        EnglishName = "Dy na",
                        PassportNo = "M997654321",
                        PhoneNumber = "018067492"
                    },
                        new VaccineCard
                    {
                        CardType = "MOD",
                        VaccinationDate = DateTime.Now.AddMonths(-1),
                        VaccineManufacturer = "Sinovac",
                        IsFullyVaccinated = true,
                        DosesReceived = 4,
                        MilitaryId = "MOD144",
                        KhmerName = "កក្តា",
                        EnglishName = "Kak Da",
                        PassportNo = "M997654321",
                        PhoneNumber = "015967422"
                    },
                       new VaccineCard
                    {
                        CardType = "MOH",
                        VaccinationDate = DateTime.Now.AddMonths(-1),
                        VaccineManufacturer = "AstraZeneca",
                        IsFullyVaccinated = true,
                        DosesReceived = 3,
                        MilitaryId = "MOD137",
                        KhmerName = "វុទ្ធី​ សា",
                        EnglishName = "Vuthy Sa",
                        PassportNo = "M997654321",
                        PhoneNumber = "018067452"
                    }

                });
                _context.SaveChanges();
            }

            if (!_context.Customers.Any())
            {
                _context.Customers.AddRange(new List<Customer>
            {
                new Customer { FirstName = "Son", LastName = "Dara", PhoneNumber = "012345678", Email = "sondara@gmail.com", Address = "Phnom Penh" },
                new Customer { FirstName = "Rin", LastName = "ThiDa", PhoneNumber = "098765432", Email = "rinthida@gmail.com", Address = "Kandal" },
                new Customer { FirstName = "Van", LastName = "Sara", PhoneNumber = "015067492", Email = "sara@gmail.com", Address = "Pursat" },
                new Customer { FirstName = "Dy", LastName = "Na", PhoneNumber = "018067412", Email = "dyna@gmail.com", Address = "Phnom Penh" },
                new Customer { FirstName = "Kak", LastName = "Da", PhoneNumber = "015967422", Email = "kakda@gmail.com", Address = "Kandal" },
                new Customer { FirstName = "Vuthy", LastName = "Sa", PhoneNumber = "018067452", Email = "vuthysa@gmail.com", Address = "Phnom Penh" }
            });
                _context.SaveChanges();
            }

            if (!_context.Visits.Any())
            {
                _context.Visits.AddRange(new List<Visit>
            {
                new Visit { CustomerID = 1, ShopID = 1, VaccineCardID = 1, ProvinceID = 1, VisitDate = DateTime.Now, VisitPurpose = "Shopping", HealthScreeningPassed = true },
                new Visit { CustomerID = 2, ShopID = 2, VaccineCardID = 2, ProvinceID = 2, VisitDate = DateTime.Now, VisitPurpose = "Medical", HealthScreeningPassed = true },
                new Visit { CustomerID = 3, ShopID = 3, VaccineCardID = 3, ProvinceID = 1, VisitDate = DateTime.Now, VisitPurpose = "Shopping", HealthScreeningPassed = true },
                new Visit { CustomerID = 4, ShopID = 3, VaccineCardID = 4, ProvinceID = 3, VisitDate = DateTime.Now, VisitPurpose = "Medical", HealthScreeningPassed = true },
                new Visit { CustomerID = 5, ShopID = 2, VaccineCardID = 5, ProvinceID = 1, VisitDate = DateTime.Now, VisitPurpose = "Shopping", HealthScreeningPassed = true },
                new Visit { CustomerID = 6, ShopID = 1, VaccineCardID = 6, ProvinceID = 2, VisitDate = DateTime.Now, VisitPurpose = "Medical", HealthScreeningPassed = true }
            });
                _context.SaveChanges();
            }
        }
    }


}
