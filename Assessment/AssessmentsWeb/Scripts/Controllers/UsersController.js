var UsersController = function ($scope,PaginationFactory, UsersService) {

    document.getElementById('ASSESSMENTS').style.color = 'white';
    document.getElementById('ANALYTICS').style.color = '#white';
    document.getElementById('ADMINISTRATION').style.color = '#11B8D5';
    document.getElementById('Users').className = "leftItemsChosen";
    document.getElementById('AssessmentTypes').className = "leftItems";
    $scope.Users = [];
    $scope.AllUsers = [];
    $scope.search = "";
    UsersService.getAllUsers().then(function (response) {
        $scope.AllUsers = response;
        PaginationFactory.setItems($scope.AllUsers,15);
        $scope.Users = PaginationFactory.getPageItems();
        $scope.ArrayOfPages = PaginationFactory.getArrayOfPages();
    });
        $scope.Update = function (user) {
            UsersService.putUser(user);
        }
        $scope.showPage = function (page) {
            if (page == 'prev') {
                $scope.Users = PaginationFactory.getPrevPage();
            }
            else {
                if (page == 'next') {
                    $scope.Users = PaginationFactory.getNextPage();
                }
                else {
                    $scope.Users = PaginationFactory.getPageItems(page);
                }
            }
        }
        $scope.currentPage = function () {
            return PaginationFactory.getCurrentPage();
        }
 
    
    
}
UsersController.$inject = ['$scope','PaginationFactory', 'UsersService'];
app.controller('UsersController', UsersController);