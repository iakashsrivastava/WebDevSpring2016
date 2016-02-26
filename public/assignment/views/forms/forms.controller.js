/**
 * Created by akash on 2/23/16.
 */

(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);

    function FormController(FormService,$scope,$rootScope,$location){

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        $scope.allforms=[];
        FormService.findAllFormsForUser($rootScope.loggedUser._id, callback);

        function callback(response){
            $scope.allforms = response;

        }

        function addForm(index){
            if(index>-1) {
                FormService.createFormForUser($rootScope.loggedUser._id, $scope.title, callback);

                function callback(response) {
                    $scope.allforms.push(response);
                    $scope.title = null;
                }
            }
        }

        function selectForm(index){
            var form = $scope.allforms[index];
            $scope.title = form.title;

            function callback(response){

            }

        }

        function updateForm(index){
            var form = $scope.allforms[index];
            FormService.updateFormById( form._id,$scope.title,callback);
            function callback(response){

            }

        }

        function deleteForm(index){

            var form = $scope.allforms[index];
            FormService.deleteFormById(form._id,callback);

            function callback(response){
                $scope.allforms =response;
            }

        }

    }


})();