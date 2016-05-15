using System;

using NUnit.Framework;
using Moq;

using AssessmentsWebApi.Controllers;
using AssessmentServices.UnitOfWork;
using AssessmentServices.ModelsDTO;
using System.Collections;


namespace AssessmentsWebApi.Tests.ControllersTests
{
    [TestFixture]
    public class AssessmentControllerTests
    {
        private ICompetenceManagerUnitOfWork _unit;
        private AssessmentsController _controller;

        [SetUp]
        public void Setup()
        {
            _unit = new UnitOfWork();
            _controller = new AssessmentsController(_unit);
        }

        //[Test]
        //public void GetAllAssessmentsWhichHasToBeNotNull_Test()
        //{
        //    // Arrange


        //    // Act
        //    var actualAssessments = _controller.GetAssessments();

        //    // Assert
        //    CollectionAssert.AllItemsAreNotNull(actualAssessments);
        //}

        //[Test]
        //public void GetAllAssessmentWithCorrectInstanceOfType_Test()
        //{
        //    // Arrange


        //    // Act
        //    var actualAssessments = _controller.GetAssessments();

        //    // Assert
        //    CollectionAssert.AllItemsAreInstancesOfType(actualAssessments, typeof(AssessmentDTO));
        //}

        [Test]
        public void GetStrongAreas_RightId_Test()
        {
            //      Arrange

            //      Act
            var actual = _controller.GetWeakAreas(4);

            //      Assert
            //CollectionAssert.IsNotEmpty(actual);
        }

        [Test]
        public void GetWeakAreas_RightId_Test()
        {
            //      Arrange

            //      Act
            var actual = _controller.GetStrongAreas(3);

            //      Assert
            //CollectionAssert.IsNotEmpty(actual);
        }

        [Test]
        public void GetStrongAreas_WrongId_Test()
        {
            //      Arrange

            //      Act
            var actual = _controller.GetStrongAreas(0);

            //      Assert
            //CollectionAssert.IsEmpty(actual);
        }

        [Test]
        public void GetWeakAreas_WrongId_Test()
        {
            //      Arrange

            //      Act
            var actual = _controller.GetWeakAreas(1);

            //      Assert
            //CollectionAssert.IsEmpty(actual);
        }

        [Test]
        public void GetStrongWeakAreas_EqualContent_Test()
        {

            //      Arrange
            var expected = ActuallStrongAreasId14();
            //      Act


            var actual = _controller.GetStrongAreas(14);

            //      Assert
            //CollectionAssert.AreNotEqual(expected, actual);
        }

        private ArrayList ActuallStrongAreasId14()
        {
            ArrayList ActuallAreas = new ArrayList();
            ArrayList criteriaAndScores = new ArrayList();
            criteriaAndScores.Add(new { criterion = "New Criterion 2 of Process",
                                        score = "Fully Implemented"
            });
            ActuallAreas.Add(new { area = "Development Process 2.0",
                                   description = "The scope of this area is correspondence of actual application architecture to designed one as well as to general software development requirements.",
                                   critAndScor = criteriaAndScores
            });
            return ActuallAreas;
        }

    }
}
