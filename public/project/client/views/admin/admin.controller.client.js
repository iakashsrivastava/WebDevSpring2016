/**
 * Created by akash on 3/9/16.
 */

(function(){
    angular
        .module("SocialMashup")
        .controller("AdminController",AdminController);

    function AdminController(UserService,$scope,$timeout) {

        $scope.gridallUsers = {
            enableFiltering: true,
            paginationPageSizes: [10, 25, 50, 75, 100, 1000],
            paginationPageSize: 10,
            columnDefs: [
                {
                    name: 'Id',
                    field: '_id'
                }, {
                    name: 'UserName',
                    field: 'username'
                }, {
                    name: 'Password',
                    field: 'password'
                }, {
                    name: 'Email',
                    field: 'emails'
                },
                {
                    name: 'Account',
                    field: 'account_type'
                },
                {
                    name: 'Date Created',
                    field: 'date'
                },
                {
                    name: 'Delete User',
                    cellTemplate: '<span class="glyphicon glyphicon-remove" ng-click="grid.appScope.deleteUser(row.entity._id)"></span>',
                    enableFiltering: false
                }

            ]
        };

        $scope.deleteUser = deleteUser;

        function deleteUser(_id){
            UserService.deleteUserById(_id).then(
                function(response){
                    findAllUsers();
                },
                function(err) {
                    $scope.error = err;
                }
            );
        }

        function findAllUsers(){
            UserService.findAllUsers().then(
                function(response){
                    for(var i=0; i<response.length; i++){
                        if(response[i].facebook != undefined)
                            response[i].account_type ='Facebook';

                        else if(response[i].google != undefined)
                        response[i].account_type ='Google';

                        else if(response[i].twitter != undefined)
                        response[i].account_type ='Twitter';

                        else
                            response[i].account_type ='Mashup';
                    }

                    $scope.gridallUsers.data =response
                },
                function(err) {
                    $scope.error = err;
                }
            );
        }

        findAllUsers();

        $scope.callback = function(response){
            console.log(response);
            alert('share callback');
        }

        $timeout(function(){
            $scope.url = 'https://www.youtube.com/watch?v=wxkdilIURrU';
            $scope.text = 'testing second share';
            $scope.title = 'title2';
        },1000)

    }

})();