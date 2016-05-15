using System;
using Moq;
using AssessmentModel;
using NUnit.Framework;
using AssessmentServices;
using AssessmentsWebApi.Controllers;
using AssessmentServices.UnitOfWork;
using AssessmentServices.Factory;
using AssessmentServices.ModelsDTO;
using AssessmentServices.CustomDTO;
using System.Linq;
using System.Net.Http;

namespace AssessmentWebAPI.Tests.APIControllerTests
{
    [TestFixture]
    public class ReportsControllerTests
    {
        private ICompetenceManagerUnitOfWork unit;
        private ReportsController controller;

        [SetUp]
        public void Setup()
        {
            unit = new UnitOfWork();

            controller = new ReportsController(unit);
        }

        [Test]
        public void GetQuaterlyReportWhichHasToBeNotNull_Test()
        {
            // Arrange
            DateTime testDateTime = new DateTime();

            // Act
            var actualQuaterlyReport = controller.GetQuaterlyReport(testDateTime);

            // Assert
            CollectionAssert.AllItemsAreNotNull(actualQuaterlyReport);
        }

        [Test]
        public void GetQuaterlyReportWithCorrectInstanceOfType_Test()
        {
            // Arrange
            DateTime testDateTime = new DateTime();

            // Act
            var actualQuaterlyReport = controller.GetQuaterlyReport(testDateTime);

            // Assert
            CollectionAssert.AllItemsAreInstancesOfType(actualQuaterlyReport, typeof(QuaterlyReport));
        }

    }
}
