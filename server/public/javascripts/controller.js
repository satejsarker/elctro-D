var myApp = angular.module('myapp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) { console.log("Hello World from controller"); }]);