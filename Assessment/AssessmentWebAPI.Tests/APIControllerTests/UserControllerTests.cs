using System;

using NUnit.Framework;
using Moq;

using AssessmentsWebApi.Controllers;
using AssessmentServices.UnitOfWork;
using AssessmentServices.ModelsDTO;

namespace AssessmentsWebApi.Tests.ControllersTests
{
    [TestFixture]
    public class UserControllerTests
    {
        private IUnitOfWork _unit;
        private UsersController _controller;

        [SetUp]
        public void Setup()
        {
            _unit = new UnitOfWork();
            _controller = new UsersController(_unit);
        }

        [Test]
        public void GetAllUsersWhichHasToBeNotNull_Test()
        {
            // Arrange

            // Act
            var actualUsers = _controller.GetAllUsers();

            // Assert
            CollectionAssert.AllItemsAreNotNull(actualUsers);
        }

        [Test]
        public void GetAllUsersWithCorrectInstanceOfType()
        {
            // Arrange

            // Act
            var actualUsers = _controller.GetAllUsers();

            // Assert
            CollectionAssert.AllItemsAreInstancesOfType(actualUsers, typeof(UserDTO));
        }
    }
}
