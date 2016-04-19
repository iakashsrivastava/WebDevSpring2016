/**
 * Created by akash on 3/9/16.
 */

(function(){
    angular
        .module("SocialMashup")
        .controller("AdminController",AdminController);

    function AdminController(UserService,$scope,$timeout) {

        $scope.showUsersDiv =showUsersDiv;
        $scope.showGrid = false;

        function showUsersDiv(){
            if($scope.showGrid === true)
                $scope.showGrid = false;
            else
                $scope.showGrid = true;
        }

        var allUsers=[];
        $scope.gridallUsers = {
            enableCellEdit: false,
            enableFiltering: true,
            paginationPageSizes: [10, 25, 50, 75, 100, 1000],
            paginationPageSize: 10,

            columnDefs: [
                {
                    name: 'Id',
                    field: '_id'
                    ,minWidth: 100
                }, {
                    name: 'UserName',
                    field: 'username'
                    ,minWidth: 100
                }, {
                    name: 'Password',
                    field: 'password',
                    enableCellEdit: true
                    ,minWidth: 100
                }, {
                    name: 'Email',
                    field: 'emails'
                    ,minWidth: 100
                },
                {
                    name: 'Account',
                    field: 'account_type'
                    ,minWidth: 100
                },
                {
                    name: 'Roles',
                    field: 'roles',
                    enableCellEdit: true
                    ,minWidth: 50

                },
                {
                    name: 'Date Created',
                    field: 'date'
                    ,minWidth: 150
                },
                {
                    name: 'Actions',
                    cellTemplate: '<span class="glyphicon glyphicon-remove" ng-click="grid.appScope.deleteUser(row.entity._id,row.entity.roles)" style="color: red;padding:15px"></span>' +
                                    '<span class="glyphicon glyphicon-ok" ng-click="grid.appScope.updateUserPassword(row.entity._id,row.entity.password,row.entity.roles)" style="color: green;padding:15px"></span>',
                    enableFiltering: false
                    ,minWidth: 100,
                    maxWidth: 100,
                    enableCellEdit: false
                }

            ]
        };

        $scope.deleteUser = deleteUser;
        $scope.updateUserPassword =updateUserPassword;


        $scope.userComments =userComments;

        function userComments(id){
            console.log('get comments'+ id);
        }

        function updateUserPassword(id, password, roles){
            rol =['admin','user'];
            for(var i=0; i<allUsers.length; i++){
                if(allUsers[i]._id === id){
                    allUsers[i].password = password;
                    if(roles.indexOf('admin') > -1)
                        allUsers[i].roles =rol;
                    UserService.updateUser(id,allUsers[i]).then(
                        function(response){

                        },
                        function(err) {
                            $scope.error = err;
                        }
                    );
                }
            }
        }

        function deleteUser(_id, rl){
            console.log(rl);
            if(rl.indexOf('admin') > -1) {}
            else
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
                    allUsers=response;
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