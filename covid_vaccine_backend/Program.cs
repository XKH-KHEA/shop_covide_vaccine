
using CovidVaccineCardSystem.Data;
using CovidVaccineCardSystem.Services;
using Microsoft.EntityFrameworkCore;

namespace CovidVaccineCardSystem
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddDbContext<AppDbContext>(options =>
               options.UseSqlServer(builder.Configuration.GetConnectionString("SqlConnection")));
            builder.Services.AddControllersWithViews();

            builder.Services.AddTransient<ReportService>();
            builder.Services.AddScoped<DbSeeder>();
            builder.Services.AddControllers();
          
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins", builder =>
                    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            });
            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();
         

            app.UseCors("AllowAllOrigins");

            app.UseCors("AllowAll");

          
            app.MapControllers();


            using (var scope = app.Services.CreateScope())
            {
                var seeder = scope.ServiceProvider.GetRequiredService<DbSeeder>();
                seeder.Seed();
            }
            app.MapControllers();

            app.Run();
        }
    }
}
