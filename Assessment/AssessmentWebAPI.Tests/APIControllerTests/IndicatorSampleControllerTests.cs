using System;

using NUnit.Framework;
using Moq;

using AssessmentsWebApi.Controllers;
using AssessmentServices.UnitOfWork;
using AssessmentServices.ModelsDTO;

namespace AssessmentsWebApi.Tests.ControllersTests
{
    [TestFixture]
    public class IndicatorSampleControllerTests
    {
        private ICompetenceManagerUnitOfWork _unit;
        private IndicatorSampleController _controller;

        [SetUp]
        public void Setup()
        {
            _unit = new UnitOfWork();
            _controller = new IndicatorSampleController(_unit);
        }


        [Test]
        public void GetAllIndicatorSamplesWhichHasToBeNotNull_Test()
        {
            // Arrange

            // Act
            var actualIndicatorSamples = _controller.GetAllIndicatorSamples();

            // Assert
            CollectionAssert.AllItemsAreNotNull(actualIndicatorSamples);
        }

        [Test]
        public void GetAllIndicatorSamplesWithCorrectInstanceOfType()
        {
            // Arrange

            // Act
            var actualIndicatorSamples = _controller.GetAllIndicatorSamples();

            // Assert
            CollectionAssert.AllItemsAreInstancesOfType(actualIndicatorSamples, typeof(IndicatorSampleDTO));
        }
    }
}
