namespace CovidVaccineCard.Models
{
    public class Visit
    {
        public int VisitID { get; set; }  
        public int CustomerID { get; set; }
        public Customer Customer { get; set; }

        public int ShopID { get; set; } 
        public Shop Shop { get; set; } 

        public int VaccineCardID { get; set; } 
        public VaccineCard VaccineCard { get; set; } 

        public int ProvinceID { get; set; } 
        public Province Province { get; set; } 

        public DateTime VisitDate { get; set; } 

     
        public string VisitPurpose { get; set; } 
        public bool HealthScreeningPassed { get; set; } 
    }

}
