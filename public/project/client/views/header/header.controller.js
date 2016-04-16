/**
 * Created by akash on 3/3/16.
 */

(function () {
    angular
        .module("SocialMashup")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, $location, UserService) {

        $scope.call = call;
        $scope.gotoHome = gotoHome;
        $scope.logout = logout;
        $scope.user = user;


        if($rootScope.loggedUser)
            var userSearches = $rootScope.loggedUser.search;

        //function alluserSearches(){
        //    for(var j=0; j<)
        //}

        //function logout(){
        //    $rootScope.loggedUser = null;
        //    $location.url("/home");
        //}

        function logout() {
            UserService.logout().then(
                function (response) {
                    $rootScope.loggedUser = null;
                    $location.url("/home");
                },
                function (err) {
                    $scope.error = err;
                }
            );
        }

        function user() {
            $location.url("/profile");
        }

        function gotoHome() {
            $location.url("/home");
        }

        function call(searchText) {
            if($rootScope.loggedUser && searchText.text != undefined) {
                searchText = searchText.text;

                UserService.updateUser($rootScope.loggedUser._id,$rootScope.loggedUser).then(
                    function(response){
                        //console.log(response);
                    },
                    function(err) {
                        $scope.error = err;
                    }
                );
            }
            else if($rootScope.loggedUser) {
                $rootScope.loggedUser.search.push({text: searchText});
                UserService.updateUser($rootScope.loggedUser._id,$rootScope.loggedUser).then(
                    function(response){
                        //console.log(response);
                    },
                    function(err) {
                        $scope.error = err;
                    }
                );
            }

            $location.url("/search/" + searchText);
        }

        setTimeout(function () {
            if($rootScope.loggedUser){
            $scope.$apply(function(){
                var q=$rootScope.loggedUser.search;

                console.log(q)

                var numbers = new Bloodhound({
                    datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.text); },
                    queryTokenizer: Bloodhound.tokenizers.whitespace,
                    local: q
                });

                numbers.initialize();
                $scope.multiExample = [
                    {
                        name: 'nhl',
                        displayKey: 'text',
                        source: numbers.ttAdapter(),   // Note the nhl Bloodhound engine isn't really defined here.
                        templates: {
                            header: '<h4 class="search-text">History</h4>'
                        }
                    },
                    {
                        name: 'nba',
                        displayKey: 'num',
                        source: numbers1.ttAdapter(),   // Note the nba Bloodhound engine isn't really defined here.
                        templates: {
                            header: '<h4 class="search-text">Suggestions</h4>'
                                }
                            }
                        ];
                    });
                }
                else{
                $scope.multiExample = [
                    {
                        name: 'nba',
                        displayKey: 'num',
                        source: numbers1.ttAdapter(),   // Note the nba Bloodhound engine isn't really defined here.
                        templates: {
                            header: '<h4 class="search-text">Suggestions</h4>'
                        }
                    }
                ];
            }

        }, 500);

        $scope.multiExample=[];

        var numbers1 = new Bloodhound({
            datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.num); },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: [
                { num: 'one' ,_id:'best'},
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

        numbers1.initialize();

        // Typeahead options object
        $scope.exampleOptions = {
            highlight: true
        };


    }

})();