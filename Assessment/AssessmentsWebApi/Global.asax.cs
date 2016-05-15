using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Routing;

using AssessmentsWebApi.Filters;
using System.Data.Entity.Core;

using System.Net;

using System.Data.Entity.Infrastructure;

namespace AssessmentsWebApi
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);

            // Enable json serializing fields that may contains 'null' value &
            // fields with default value
            GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings = new Newtonsoft.Json.JsonSerializerSettings()
            {
                DefaultValueHandling = Newtonsoft.Json.DefaultValueHandling.Include,
                NullValueHandling = Newtonsoft.Json.NullValueHandling.Include
            };

            GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            GlobalConfiguration.Configuration.Formatters.Remove(GlobalConfiguration.Configuration.Formatters.XmlFormatter);

            // Exception filters registration. Exceptions of all registered types below
            // will be handled during filtering. 
            GlobalConfiguration.Configuration.Filters.Add(new GlobalExeptionFilterAttribute(typeof(ProviderIncompatibleException), HttpStatusCode.NotFound, "No connection with database. Please, try again later."));
            GlobalConfiguration.Configuration.Filters.Add(new GlobalExeptionFilterAttribute(typeof(EntityException), HttpStatusCode.NotFound, "No connection with database. Please, try again later."));
            GlobalConfiguration.Configuration.Filters.Add(new GlobalExeptionFilterAttribute(typeof(DbUpdateConcurrencyException), HttpStatusCode.InternalServerError, "Error occured while updating data."));
            GlobalConfiguration.Configuration.Filters.Add(new GlobalExeptionFilterAttribute(typeof(EntityCommandExecutionException), HttpStatusCode.NotFound, "No connection with database. Please, try again later."));
            GlobalConfiguration.Configuration.Filters.Add(new GlobalExeptionFilterAttribute(typeof(UpdateException), HttpStatusCode.InternalServerError, "Error occured while updating data."));
            GlobalConfiguration.Configuration.Filters.Add(new GlobalExeptionFilterAttribute(typeof(HttpResponseException), HttpStatusCode.BadRequest, "Something wrong with the last request."));
            GlobalConfiguration.Configuration.Filters.Add(new GlobalExeptionFilterAttribute(typeof(InvalidOperationException), HttpStatusCode.BadRequest, "Operation Invalid."));
            GlobalConfiguration.Configuration.Filters.Add(new GlobalExeptionFilterAttribute(typeof(KeyNotFoundException), HttpStatusCode.NotFound, "Requested entity missing in the database."));
            GlobalConfiguration.Configuration.Filters.Add(new GlobalExeptionFilterAttribute(typeof(NullReferenceException), HttpStatusCode.NoContent, "No data in request."));
            GlobalConfiguration.Configuration.Filters.Add(new GlobalExeptionFilterAttribute(typeof(NotImplementedException), HttpStatusCode.InternalServerError, "Support for this operation is not implemented."));
            GlobalConfiguration.Configuration.Filters.Add(new GlobalExeptionFilterAttribute(typeof(Exception), HttpStatusCode.InternalServerError, "Some error occured."));

        }
    }
}
