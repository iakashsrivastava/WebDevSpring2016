/**
 * Created by akash on 3/9/16.
 */

(function(){
    angular
        .module("SocialMashup")
        .controller("AdminController",AdminController);

    function AdminController(UserService,$scope) {

        $scope.gridallUsers = {
            enableFiltering: true,
            columnDefs: [
                {
                    name: 'Id',
                    field: '_id'
                }, {
                    name: 'username',
                    field: 'username'
                }, {
                    name: 'password',
                    field: 'password'
                }, {
                    name: 'emails',
                    field: 'emails'
                }
            ]
        };

        //$scope.gridallUsers.data = [{
        //        "firstName": "Cox",
        //        "lastName": "Carney",
        //        "company": "Enormo",
        //        "employed": true
        //    }, {
        //        "firstName": "Lorraine",
        //        "lastName": "Wise",
        //        "company": "Comveyer",
        //        "employed": false
        //    }, {
        //        "firstName": "Nancy",
        //        "lastName": "Waters",
        //        "company": "Fuelton",
        //        "employed": false
        //    }];


        function findAllUsers(){
            UserService.findAllUsers().then(
                function(response){
                    $scope.gridallUsers.data =response
                },
                function(err) {
                    $scope.error = err;
                }
            );
        }

        findAllUsers();

        $scope.selectedNumber = null;
        $scope.selectedNumber1 = null;

        // instantiate the bloodhound suggestion engine
        var numbers = new Bloodhound({
            datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.num); },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: [
                { num: 'one' },
                { num: 'two' },
                { num: 'three' },
                { num: 'four' },
                { num: 'five' },
                { num: 'six' },
                { num: 'seven' },
                { num: 'eight' },
                { num: 'nine' },
                { num: 'ten' }
            ]
        });

        var numbers1 = new Bloodhound({
            datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.num); },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: [
                { num: 'one' },
                { num: 'two' },
                { num: 'three' },
                { num: 'four' },
                { num: 'five' },
                { num: 'six' },
                { num: 'seven' },
                { num: 'eight' },
                { num: 'nine' },
                { num: 'ten' }
            ]
        });

        // initialize the bloodhound suggestion engine
        numbers.initialize();
        numbers1.initialize();

        // Typeahead options object
        $scope.exampleOptions = {
            highlight: true
        };

        $scope.multiExample = [
            {
                name: 'nba',
                displayKey: 'num',
                source: numbers1.ttAdapter()   // Note the nba Bloodhound engine isn't really defined here.
            },
            {
                name: 'nhl',
                displayKey: 'num',
                source: numbers.ttAdapter()   // Note the nhl Bloodhound engine isn't really defined here.
            }
        ];

        $scope.numbersDataset = {
            displayKey: 'num',
            source: numbers.ttAdapter()
        };


    }

})();