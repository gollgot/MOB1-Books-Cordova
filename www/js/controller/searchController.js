function searchController($scope, $http) {
	
	$scope.isbn = 9780702028441; // A default value, for dev, change later
	
	// Function when 
	$scope.search = function(){
		var url = "https://www.googleapis.com/books/v1/volumes?q="+$scope.isbn;
		$http.get(url).success(httpSuccess).error(httpError);
	}

	httpSuccess = function(response){
		console.log(response);
	}

	httpError = function(){
		alert("Impossible de récupérer ce livre, vérifiez le numéro ISBN ou votre connexion internet");
	}

}