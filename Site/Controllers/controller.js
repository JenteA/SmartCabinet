var myApp = angular.module('myApp', []);

( function() {
		var AppCtrl = function($scope, $http) {
			$scope.knoppen = true;

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

			//item toevoegen aan database
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
				console.log("ik weet nimeer wat te doen")
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

			$scope.uitlenen = function(){
				console.log("leen iets uuuiiiiittttt!!!!!!!");
				$http.put("/Site/uitlenen").success(function(response) {
					refresh();
				});
			};
			
			$scope.terugbrengen = function(){
				console.log("breng iets teruuuug!!!!!!!");
				$http.put("/Site/terugbrengen").success(function(response) {
					refresh();
				});
			};
			
			$scope.login = function(){
				console.log($scope.user);
				$http.post("/Site/login", $scope.user).success(function(response){
					console.log(response);
					$scope.knoppen = response;
				});
				//$scope.knoppen = true;
			};

		}
		angular.module('myApp').controller('AppCtrl', ["$scope", '$http', AppCtrl]);

	}());