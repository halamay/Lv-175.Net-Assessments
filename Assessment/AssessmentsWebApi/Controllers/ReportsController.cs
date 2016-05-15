using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using AssessmentModel;
using AssessmentServices.UnitOfWork;
using AssessmentServices.ModelsDTO;
using AssessmentServices.CustomDTO;
using AssessmentsWebApi.Controllers.BaseControllers;
using System.Collections;
using OfficeOpenXml;
using System.IO;
using System.Net.Http.Headers;
using AssessmentsWebApi.Pagination;

namespace AssessmentsWebApi.Controllers
{
    public class ReportsController : BaseController
    {
        public ReportsController(ICompetenceManagerUnitOfWork unit)
            : base(unit) { }

        // GET api/reports
        [HttpGet]
        public IEnumerable GetReports()
        {
            var source = from a in UnitOfWork.AssessmentRepository.Get()
                         join b in UnitOfWork.AreaRepository.Get() on a.Id equals b.AssesmentId
                         join c in UnitOfWork.CriterionRepository.Get() on b.Id equals c.AreaId
                         join d in UnitOfWork.IndicatorRepository.Get() on c.Id equals d.CriteriaId
                         join e in UnitOfWork.IndicatorScoreRepository.Get() on d.ScoreId equals e.Id
                         select new
                         {
                             UnitName = a.Unit,
                             Score = e.Weight
                         };

            var result = new List<QuaterlyReport>();

            var avgSource = from i in source
                            group i by i.UnitName into g
                            select new
                            {
                                UnitName = g.Key,
                                Score = g.Average(x => x.Score)
                            };

            foreach (var i in avgSource)
            {
                var assessments = (from a in UnitOfWork.AssessmentRepository.Get()
                                   where a.Unit == i.UnitName 
                                   select a).Count();

                var recommendations = (from a in UnitOfWork.AssessmentRepository.Get()
                                       where a.Unit == i.UnitName 
                                       select a).Sum(x => x.RecommendationsNum);

                var improvements = (from a in UnitOfWork.AssessmentRepository.Get()
                                    where a.Unit == i.UnitName 
                                    select a).Sum(x => x.Improvements);

                var coordinatorTime = (from a in UnitOfWork.AssessmentRepository.Get()
                                       where a.Unit == i.UnitName 
                                       select a).Sum(x => x.CoordinatorTime);

                var expertTime = (from a in UnitOfWork.AssessmentRepository.Get()
                                  where a.Unit == i.UnitName 
                                  select a).Sum(x => x.ExpertTime);

                var serviceQualityScore = (from a in UnitOfWork.AssessmentRepository.Get()
                                           where a.Unit == i.UnitName 
                                           select a).Sum(x => x.ServiceQualityScore);

                result.Add(new QuaterlyReport
                {
                    UnitName = i.UnitName,
                    Average = Decimal.Round((decimal)i.Score, 2),
                    Assessments = assessments,
                    Recommendations = recommendations ?? 0,
                    Improvements = improvements ?? 0,
                    CoordinatorTime = coordinatorTime ?? 0,
                    ExpertTime = expertTime ?? 0,
                    ServiceQualityScore = serviceQualityScore ?? 0
                });
            }

            result.Add(new QuaterlyReport
            {
                UnitName = "Total",
                Average = result.Average(x => x.Average),
                Assessments = result.Sum(x => x.Assessments),
                Recommendations = result.Sum(x => x.Recommendations),
                Improvements = result.Sum(x => x.Improvements),
                CoordinatorTime = result.Sum(x => x.CoordinatorTime),
                ExpertTime = result.Sum(x => x.ExpertTime),
                ServiceQualityScore = result.Average(x => x.ServiceQualityScore)
            });

            return result;
        }

        [HttpGet]
        public IEnumerable<QuaterlyReport> GetQuaterlyReport([FromUri] DateTime? id)
        {
            var source = from a in UnitOfWork.AssessmentRepository.Get()
                         join b in UnitOfWork.AreaRepository.Get() on a.Id equals b.AssesmentId
                         join c in UnitOfWork.CriterionRepository.Get() on b.Id equals c.AreaId
                         join d in UnitOfWork.IndicatorRepository.Get() on c.Id equals d.CriteriaId
                         join e in UnitOfWork.IndicatorScoreRepository.Get() on d.ScoreId equals e.Id
                         where a.FinishDate.HasValue && a.FinishDate.Value <= id
                         select new
                         {
                             UnitName = a.Unit,
                             Score = e.Weight
                         };

            var result = new List<QuaterlyReport>();

            if(!source.Any())
            {
                return result;
            }

            var avgSource = from i in source
                            group i by i.UnitName into g
                            select new
                            {
                                UnitName = g.Key,
                                Score = g.Average(x => x.Score)
                            };

            foreach (var i in avgSource)
            {
                var assessments = (from a in UnitOfWork.AssessmentRepository.Get()
                                   where a.Unit == i.UnitName && a.FinishDate.HasValue && a.FinishDate.Value <= id
                                   select a).Count();

                var recommendations = (from a in UnitOfWork.AssessmentRepository.Get()
                                       where a.Unit == i.UnitName && a.FinishDate.HasValue && a.FinishDate.Value <= id
                                       select a).Sum(x => x.RecommendationsNum ?? 0);

                var improvements = (from a in UnitOfWork.AssessmentRepository.Get()
                                    where a.Unit == i.UnitName && a.FinishDate.HasValue && a.FinishDate.Value <= id
                                    select a).Sum(x => x.Improvements ?? 0);

                var coordinatorTime = (from a in UnitOfWork.AssessmentRepository.Get()
                                       where a.Unit == i.UnitName && a.FinishDate.HasValue && a.FinishDate.Value <= id
                                       select a).Sum(x => x.CoordinatorTime ?? 0);

                var expertTime = (from a in UnitOfWork.AssessmentRepository.Get()
                                  where a.Unit == i.UnitName && a.FinishDate.HasValue && a.FinishDate.Value <= id
                                  select a).Sum(x => x.ExpertTime ?? 0);

                var serviceQualityScore = (from a in UnitOfWork.AssessmentRepository.Get()
                                           where a.Unit == i.UnitName && a.FinishDate.HasValue && a.FinishDate.Value <= id
                                           select a).Sum(x => x.ServiceQualityScore ?? 0);

                result.Add(new QuaterlyReport
                {
                    UnitName = i.UnitName,
                    Average = Decimal.Round((decimal)i.Score, 2),
                    Assessments = assessments,
                    Recommendations = recommendations,
                    Improvements = improvements,
                    CoordinatorTime = coordinatorTime,
                    ExpertTime = expertTime,
                    ServiceQualityScore = Decimal.Round((decimal)serviceQualityScore, 2)
                });
            }

            result.Add(new QuaterlyReport
            {
                UnitName = "Total",
                Average = Decimal.Round((decimal)result.Average(x => x.Average),2),
                Assessments = result.Sum(x => x.Assessments),
                Recommendations = result.Sum(x => x.Recommendations),
                Improvements = result.Sum(x => x.Improvements),
                CoordinatorTime = result.Sum(x => x.CoordinatorTime),
                ExpertTime = result.Sum(x => x.ExpertTime),
                ServiceQualityScore = Decimal.Round((decimal)result.Average(x => x.ServiceQualityScore), 2)
            });

            return result;           
        }



        // GET api/Repotrs/GetTopWeakAreas/?typeId=1&date=1&page=0&itemsPerPage=8
        [HttpGet]
        public HttpResponseMessage GetTopWeakAreas(int typeId, [FromUri] DateTime? start, [FromUri] DateTime? end, int page, int itemsPerPage)
        {
            List<StrongWeakAreasDTO> Areas = new List<StrongWeakAreasDTO>();
            var uniqueCriterion = (from c in UnitOfWork.CriterionRepository.Get()
                                  where c.Area.Assessment.AssessmentTypeId == typeId
                                  select new { criterion = c.Name, area = c.Area.Name }).Distinct();
            foreach (var u in uniqueCriterion)
            {
                var currentCriterion = from c in UnitOfWork.CriterionRepository.Get()
                                 where c.Name == u.criterion
                                 && c.CriteriaScore.Weight != null
                                 && c.CriteriaScore.Weight != 0
                                 && c.Area.Assessment.FinishDate.HasValue
                                 && c.Area.Assessment.FinishDate.Value >= start
                                 && c.Area.Assessment.FinishDate.HasValue
                                 && c.Area.Assessment.FinishDate.Value <= end
                                 select c.CriteriaScore.Weight;
                if (currentCriterion.ToList<int>().Count > 0)
                {
                    Areas.Add(new StrongWeakAreasDTO
                    {
                        Area = u.area,
                        Criterion = u.criterion,
                        Score = Math.Round(currentCriterion.ToList<int>().Average(), 2) + " %",
                        ScoreCount = currentCriterion.ToList<int>().Count
                    });
                }
            }

            if (Areas != null)
            {
                Paging<StrongWeakAreasDTO> p = new Paging<StrongWeakAreasDTO>(Areas.OrderBy(x => x.Score).ToList(), page, itemsPerPage);
                return Request.CreateResponse(HttpStatusCode.OK, p.getContent());
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
        }
    }
}
