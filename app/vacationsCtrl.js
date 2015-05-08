app.controller('vacationsCtrl', function ($scope, $modal, $filter, Data) {
    $scope.vacation = {};
    Data.get('vacations').then(function(data){
        $scope.vacations = data.data;
        console.log($scope.vacations);
    });
    $scope.changeVacationStatus = function(vacation){
        vacation.status = (vacation.status=="Active" ? "Inactive" : "Active");
        Data.put("vacations/"+vacation.processId,{status:vacation.status});
    };
   
    $scope.open = function (p,size) {
      console.log('aaaaa');
        var modalInstance = $modal.open({
          templateUrl: 'partials/vacationEdit.html',
          controller: 'vacationEditCtrl',
          size: size,
          resolve: {
            item: function () {
              console.log(p)
              return p;
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
          console.log('angel');
          console.log(selectedObject);
          console.log(selectedObject.save);
            if(selectedObject.save == "insert"){
                $scope.vacations.push(selectedObject);
                $scope.vacations = $filter('orderBy')($scope.vacations, 'id', 'reverse');
            }else if(selectedObject.save == "update"){
                p.approved = selectedObject.approved;
            }
        });
    };
    
 

});


app.controller('vacationEditCtrl', function ($scope, $modalInstance, item, Data) {

  $scope.vacation = angular.copy(item);
        

        $scope.cancel = function () {
            $modalInstance.dismiss('Close');
        };
      
        $scope.buttonTextAP = 'Aprobar';
        $scope.buttonTextRE = 'Rechazar';

        var original = item;
        $scope.isClean = function() {
            return angular.equals(original, $scope.vacation);
        }
        
        $scope.respond = function (vacation, response) {
          if( response )
            vacation.approved = 'Aprobado';
          else
            vacation.approved = 'Rechazado';
            vacation.uid = $scope.uid;
            console.log($scope.uid);
            if(vacation.processId > 0){
                
                    if(vacation.status != 'error'){
                        var x = angular.copy(vacation);
                        x.save = 'update';
                        $modalInstance.close(x);
                    }else{
                        console.log(vacation);
                    }
                
            }else{
                vacation.status = 'Active';
                Data.post('vacations', vacation).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(vacation);
                        x.save = 'insert';
                        x.processId = result.data;
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                    }
                });
            }
        };
});
