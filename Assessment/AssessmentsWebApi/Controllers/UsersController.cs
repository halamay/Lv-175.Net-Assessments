using AssessmentModel;
using AssessmentServices.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

using System.Web.Http.Description;
using AssessmentServices.ModelsDTO;
using AssessmentsWebApi.Controllers.BaseControllers;
using Microsoft.AspNet.SignalR;
using AssessmentsWebApi.Hubs;
using AssessmentsWebApi.Pagination;

namespace AssessmentsWebApi.Controllers
{
    public class UsersController : BaseController
    {
        //private ICompetenceManagerUnitOfWork unit = new UnitOfWork();
        public UsersController(IUnitOfWork unit)
            : base(unit) { }

        // Return an IEnumerable<User> array
        // that contain all user rows in the User database table
        // GET: api/{controller}
        [HttpGet]
        public IEnumerable<UserDTO> GetAllUsers()
        {
            IQueryable<User> query;

            query = UnitOfWork.UserRepository.Get();

            var result = query.ToList()
                              .Select(s => DTOFactory.Create(s));

            return result.ToList();
        }

        [HttpGet]
        public HttpResponseMessage GetUsers(int page, int itemsPerPage)
        {

            var query = UnitOfWork.UserRepository.Get().ToList().Select(s => DTOFactory.Create(s));

            if (query != null)
            {
                List<UserDTO> Users = query.ToList();
                Paging<UserDTO> p = new Paging<UserDTO>(Users, page, itemsPerPage);
                return Request.CreateResponse(HttpStatusCode.OK, p.getContent());
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
        }
        // GET: api/{controller}/{action}/{id}
        // Return User serialized object
        // which Id == {id}
        [HttpGet]
        public HttpResponseMessage GetUserByID(int id)
        {
            var user = UnitOfWork.UserRepository.GetByID(id);
            if (user != null)
            {
                return Request.CreateResponse(HttpStatusCode.OK, DTOFactory.Create(user));
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, "User not found in database.");
            }
        }

        [HttpGet]
        [Route("api/users/GetCurrentUser/")]
        public HttpResponseMessage GetCurrentUser()
        {
            string login = System.Web.HttpContext.Current.Request.LogonUserIdentity.Name.ToString();
            var indicator = (UnitOfWork.UserRepository.Get(x => x.Login == login)
                              .FirstOrDefault());

            var _context = GlobalHost.ConnectionManager.GetHubContext<AssessmentHub>();
            _context.Clients.All.currentUser(indicator.Name);

            return Request.CreateResponse(HttpStatusCode.OK, DTOFactory.Create(indicator));
        }

        [HttpPost]
        public HttpResponseMessage AddUser([FromBody]UserDTO userDTO)
        {
            var entity = DTOFactory.Parse(userDTO);

            if (entity == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Could not parse an User");
            }

            UnitOfWork.UserRepository.Insert(entity);
            return Request.CreateResponse(HttpStatusCode.Created, DTOFactory.Create(entity));

        }
        [HttpPut]
        public HttpResponseMessage ModifyUsers([FromBody] UserDTO user)
        {
            var originalUser = DTOFactory.Parse(user);
            UnitOfWork.UserRepository.Update(originalUser);
            return Request.CreateResponse(HttpStatusCode.OK);
        }

    }
}
// GET: api/{controller}/{action}/{id}
// Return all Area rows that are selected from AreaSample table,
// which AssessmentTypeID field are equal to id
// id = means that is an Id column of Assessments table



// Enable to modify AreaSample. Change an existing AreaSample
// by id
//   [HttpPut]
//[Route("api/User/{id:int}")]
//public HttpResponseMessage ModifyAreaSample(int id, [FromBody] UserDTO user)
//{
//    try
//    {
//        var updateAreaSample = DTOFactory.Parse(user);

//        if (updateAreaSample == null)
//            Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Could not read object");

//        var originalAreaSample = UnitOfWork.AreaSamlpeRepository.GetByID(id);

//        if (originalAreaSample == null || originalAreaSample.Id != id)
//        {
//            Request.CreateResponse(HttpStatusCode.NotModified, "Course is not found");
//        }
//        else
//        {
//            updateAreaSample.Id = id;
//        }

//        try
//        {
//            UnitOfWork.AreaSamlpeRepository.Update(updateAreaSample);
//            return Request.CreateResponse(HttpStatusCode.OK, DTOFactory.Create(updateAreaSample));
//        }
//        catch (Exception)
//        {
//            return Request.CreateResponse(HttpStatusCode.NotModified);
//        }
//    }
//    catch (Exception e)
//    {
//        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, e);
//    }
//}


// Enable to add new areaSample
//[HttpPost]
//public HttpResponseMessage AddAreaSample([FromBody] AreaSampleDTO areaSample)
//{
//    try
//    {
//        var entity = DTOFactory.Parse(areaSample);

//        if (entity == null)
//        {
//            Request.CreateResponse(HttpStatusCode.BadRequest, "Could not read area from body");
//        }

//        try
//        {
//            UnitOfWork.AreaSamlpeRepository.Insert(entity);

//            return Request.CreateResponse(HttpStatusCode.Created, DTOFactory.Create(entity));
//        }
//        catch (Exception)
//        {
//            return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Could not save to the database");
//        }
//    }
//    catch (Exception e)
//    {
//        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, e);
//    }
// }



// There are some question to this method DELETE
// Uncomment later if you want to implement DELETE method

// Enable to delete AreaSamle using an Id
//[HttpDelete]
//public HttpResponseMessage RemoveAreaSample(int id)
//{
//    try
//    {
//        var area = UnitOfWork.AreaSamlpeRepository.GetByID(id);

//        if (area == null)
//        {
//            return Request.CreateResponse(HttpStatusCode.NotFound);
//        }
//    }
//}




