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
            console.log(searchText);

            if($rootScope.loggedUser && searchText.text != undefined) {
                searchText = searchText.text;
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
                console.log(q);
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
                        displayKey: 'text',
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
                        displayKey: 'text',
                        source: numbers1.ttAdapter(),   // Note the nba Bloodhound engine isn't really defined here.
                        templates: {
                            header: '<h4 class="search-text">Suggestions</h4>'
                        }
                    }
                ];
            }

        }, 2500);

        $scope.multiExample=[];

        var obj =['Messi','Paul Walker','Boston Marathon Bombing','Nelson Mandela','Cory Monteith','iPhone s','Government Shutdown',
            'James Gandolfini','Harlem Shake','Royal Baby','Adrian Peterson','','Miley Cyrus','Drake','Kim Kardashian','Justin Bieber',
            'Beyonce','Rihanna','Taylor Swift','Selena Gomez','Katy Perry','Kanye West','','Black Friday','Cyber Monday','Daytona ',
            'Chinese New Year','Tour de France','AMAs','French Open','Cinco de Mayo','Yom Kippur','LA Auto Show',
            'Blue Moon','Bud Light','Bud Light Platinum','Kingfisher','Stella Artois','Bud Light Lime','Coors','Yuengling',
            'Birra Moretti','Coors Light','Miley Cyrus and Liam Hemsworth','Taylor Swift and Harry Styles','Kris Jenner and Bruce Jenner',
            'Nina Dobrev and Ian Somerhalder','Miranda Kerr and Orlando Bloom','Jennifer Lawrence and Nicholas Hoult',
            'Ryan Seacrest and Julianne Hough','Katy Perry and John Mayer','Marc Jacobs and Harry Louis',
            'Michael Douglas and Catherine Zeta-Jones','University of Phoenix','Liberty University',
            'Columbia University','Ashford University','Northwestern University','University of Michigan',
            'University of Washington','Duke University','Ohio State University','Cornell University','Thirty Seconds to Mars: Love',
            ' Lust',' Faith and Dreams Tour','The Who: Quadrophenia and More Tour','P!nk: The Truth About Love Tour',
            'Fun.: Most Nights Summer Tour','Justin Bieber: Believe Tour','Beyoncé: The Mrs. Carter Show World Tour',
            'One Direction: Take Me Home Tour','Rihanna: Diamonds World Tour','Taylor Swift: Red Tour',
            'Bruno Mars: The Moonshine Jungle Tour','Gangnam Style','The Cat Daddy','The Dougie','The Wobble','YMCA','The Bernie',
            'The John Wall','Macarena','Cotton Eye Joe','Shuffling','Grumpy Cat','Lil Bub','Tuna the Dog','Colonel Meow',
            'Princess Monster Truck','Menswear Dog','Sir Stuffington','Yogurt the Dog','Bully the Bulldog','Maddie the Coonhound'
            ,'Claude Debussys st birthday','the anniversary of Doctor Who','Doodle Google Winner','Googles birthday',
            'Hermann Rorschach th birthday','Womens Day','Maurice Sendaks th birthday','Celia Cruzs th birthday','Saul Bass rd birthday'
            ,'the anniversary of Roswell','Funny Pictures','Miley Cyrus','Kate Upton','Justin Bieber','Selena Gomez','Ariana Grande',
            'One Direction','Amanda Bynes','Periodic Table','Jennifer Lawrence','Man of Steel','Iron Man ','World War Z','Jobs',
            'The Conjuring','The Great Gatsby','Despicable Me ','The Purge','Pacific Rim','Mama','Angular Js','Node Js','Mean Stack',
            'Taylor Swift Bad Blood'];

        $scope.print=print;
        var all =[];
        function print(){

            for(var k=0;k<obj.length;k++){
                var obj1 ={text:obj[k]}
                all.push(obj1);
            }
        }
        print();
        //console.log(JSON.stringify(all));
        var numbers1 = new Bloodhound({
            datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.text); },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: all
        });

        // initialize the bloodhound suggestion engine

        numbers1.initialize();

        // Typeahead options object
        $scope.exampleOptions = {
            highlight: true
        };




    }

})();