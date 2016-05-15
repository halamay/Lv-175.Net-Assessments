using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssessmentServices.CustomDTO
{
    public class QuaterlyReport
    {
        public string UnitName { get; set; }
        public int Assessments { get; set; }
        public decimal Average { get; set; }
        public int Recommendations { get; set; }
        public int Improvements { get; set; }
        public decimal CoordinatorTime { get; set; }
        public decimal ExpertTime { get; set; }
        public decimal ServiceQualityScore { get; set; }
    };
}
