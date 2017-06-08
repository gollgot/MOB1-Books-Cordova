function searchController($scope, $http) {
	
	//$scope.isbnInput = 9780702028441; // A default value, for dev, change later
	
	// Function called when we submit the form (search)
	$scope.search = function(){
		var url = "https://www.googleapis.com/books/v1/volumes?q="+$scope.isbnInput;
		$http.get(url).success(httpSuccess).error(httpError);
	}
	// Succes response
	httpSuccess = function(response){
		console.log(response);
	}
	// Error response
	httpError = function(){
		alert("Impossible de récupérer ce livre, vérifiez le numéro ISBN ou votre connexion internet");
	}

	// Function called when we clic on the scan button
	$scope.scan = function(){
		// Launch camera and codebar scanner fonctionnality
		cordova.plugins.barcodeScanner.scan(
			// Success
	      	function (result) {
	          	/*alert("We got a barcode\n" +
	            	"Result: " + result.text + "\n" +
	            	"Format: " + result.format + "\n" +
	            	"Cancelled: " + result.cancelled);*/

            	// Get the result and put it on the input value
          		if(!result.cancelled){
          			$scope.isbnInput = result.text;
          			$("input#isbn").val($scope.isbnInput);
          		}
	      	},
	      	// Error
	      	function (error) {
          		alert("Erreur, format ou code bar invalide");
      		},
      		// Settings
	      	{
	          	preferFrontCamera : false, // iOS and Android
	          	showFlipCameraButton : false, // iOS and Android
	          	showTorchButton : true, // iOS and Android
	          	torchOn: false, // Android, launch with the torch switched on (if available)
	          	prompt : "Veuillez placer le code bar dans le rectangle", // Android
	          	resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
	          	formats : "EAN_8,EAN_13,CODE_128,CODE_39", // default: all but PDF_417 and RSS_EXPANDED
	          	orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
	          	disableAnimations : true, // iOS
	          	disableSuccessBeep: false // iOS
	      	}
	   	);
	}

}