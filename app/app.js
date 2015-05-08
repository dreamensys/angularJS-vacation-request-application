var app = angular.module('VacationRequest', ['ngRoute', 'ui.bootstrap', 'ngAnimate']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/', {
      title: 'Solicitudes de Vacaciones',
      templateUrl: 'partials/vacations.html',
      controller: 'vacationsCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });;
}]);
    