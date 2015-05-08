app.factory("Data", ['$http', '$location',
    function ($http, $q, $location) {

       

        var obj = {};

        obj.get = function (q) {
            return $http.get('vacation-list.json').success(function (results) {
                console.log('results');
                console.log(results);
                return results;
            });
        };
        obj.post = function (q, object) {
            return $http.post('vacation-list.json', object).then(function (results) {
                return results.data;
            });
        };
       
        return obj;
}]);
