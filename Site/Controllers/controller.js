var myApp = angular.module('myApp', []);

( function() {
		var AppCtrl = function($scope, $http) {

			console.log("Hello World from controller");

			//data inladen
			var refresh = function() {
				$http.get('/Site').success(function(response) {
					console.log("I got the data I requested");
					$scope.items = response;
					$scope.item = "";
				});
			};

			refresh();

			//vraag toevoegen aan database
			$scope.addItem = function() {
				console.log($scope.item);
				$http.post('/Site', $scope.item).success(function(response) {
					console.log(response);
					refresh();
				});
			};

			//data verwijderen uit database
			$scope.remove = function(id) {
				console.log(id);
				$http.delete("/Site/" + id).success(function(response) {
					refresh();
				});
			};

			//data aanpassen, nog niet opslaan
			$scope.edit = function(id) {
				console.log(id);
				$http.get("/Site/" + id).success(function(response) {
					$scope.item = response;
				});
			};

			//aangepaste data opslaan in database
			$scope.update = function() {
				console.log($scope.vraag._id);
				$http.put("/Site/" + $scope.item._id, $scope.item).success(function(response) {
					$scope.item = "";
					refresh();
				});
			};
			

		}
		angular.module('myApp').controller('AppCtrl', ["$scope", '$http', AppCtrl]);

	}());