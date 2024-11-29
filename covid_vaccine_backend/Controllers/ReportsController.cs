using CovidVaccineCardSystem.Services;
using Microsoft.AspNetCore.Mvc;

namespace CovidVaccineCardSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReportsController : ControllerBase
    {
        private readonly ReportService _reportService;

        public ReportsController(ReportService reportService)
        {
            _reportService = reportService;
        }

        [HttpGet("vaccination")]
        public async Task<ActionResult<List<ProvinceReport>>> GetVaccinationReport()
        {
            var report = await _reportService.GetProvinceVaccinationReport();
            return Ok(report);
        }
    }

}
