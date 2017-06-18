function searchController($scope, $http) {
	// Change the app title on the header
	$("header h5.title").text("Recherche");
	
	//$scope.isbnInput = 9780702028441; // A default value, for dev, change later
	
	// Function called when we submit the form (search)
	$scope.search = function(){
		// If has internet connection, do the request ajax, else, display error
		if(hasInternet()){
			// Create or get the library DB
		    var db = window.openDatabase("library_prod", "1.0", "Library DB", 1000000);
		    // Callback function, called when we do the sql request
		    var getBookAjax = function(serverName){
		    	var url = serverName+"?q=isbn:"+$scope.isbnInput;
		    	$http.get(url).success(httpSuccess).error(httpError);
		    }
		    // Function define in dbHandler.js
		    getServerName(db, getBookAjax);

		    // Don't remove this, this is a fake request, mandatory for the good fonctionnement... If we remove that, we have to click 2 times, don't now why, asynchrone SQL request problem ?
			$http.get("https://www.googleapis.com/books/v1/volumes?q=isbn:123").success().error();
		}else{
			displayModal(false, null, null, null, null);
		}
	}

	// Succes response
	httpSuccess = function(response){
		// There is an item
		if(response.items){
			if(response.items[0].volumeInfo.title){
				var title = response.items[0].volumeInfo.title;
			}else{
				var title = "Inconnu";
			}
			if(response.items[0].volumeInfo.authors){
				var author = response.items[0].volumeInfo.authors[0];
			}else{
				var author = "Inconnu";
			}
			if(response.items[0].volumeInfo.imageLinks){
				var cover = response.items[0].volumeInfo.imageLinks.thumbnail;
			}else{
				var cover = "Inconnu";
			}

			displayModal(true, title, author, cover, $scope.isbnInput);
		}else{
			displayModal(false, null, null, null, null);
		}

	}
	// Error response
	httpError = function(){
		//alert($('#searchModal').length);
		 if (!$('#searchModal').length) {
			displayModal(false, null, null, null, null);
		}
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
          		//alert("Erreur, format ou code bar invalide");
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

	function displayModal(success, title, author, cover, isbn){
		if(success){
			var modal = `
				<div id="searchModal" class="modal">
					<div class="modal-content">
						<h5>Un résultat à été trouvé</h5>
						<p>
							<b>Titre du livre</b><br>
							`+title+`
						</p>
						<p>
							<b>Auteur</b><br>
							`+author+`
						</p>
						<p>
							<b>Couverture</b><br>`;
							if(cover == 'Inconnu'){
								modal += 'inconnu';
							}else{
								modal += '<img src="'+cover+'">';
							}
					modal += `
						</p>
					</div>
					<div class="modal-footer">
						<a href="#search" class="modal-action modal-close waves-effect waves-red btn-flat ">Annuler</a>
						<a class="importBtn waves-effect waves-green btn-flat">Importer</a>
					</div>
				</div>	
			`;
		}else{
			var modal = `
				<div id="searchModal" class="modal">
					<div class="modal-content">
						<h5>Aucun résultat trouvé</h5>
						<p>
							Aucun résultat n'a été trouvé, veuillez vérifier le numéro ISBN ou votre connexion internet
						</p>
					</div>
					<div class="modal-footer">
						<a href="#search" class="modal-action modal-close waves-effect waves-red btn-flat ">Quitter</a>
					</div>
				</div>	
			`;
		}

		// Add the html do the body
		$('body').prepend(modal);

		// Initialize the modal
		$('.modal').modal({
			dismissible: true, // Modal can be dismissed by clicking outside of the modal
			opacity: .5, // Opacity of modal background
			inDuration: 300, // Transition in duration
			outDuration: 200, // Transition out duration
			startingTop: '4%', // Starting top style attribute
			endingTop: '10%', // Ending top style attribute
			ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
			},
			complete: function() {
				$("#searchModal").remove();
			}	
		});

		// open the modal
	  	$('#searchModal').modal('open');

	  	$('#searchModal a.importBtn').click(function(){
	  		var db = window.openDatabase("library_prod", "1.0", "Library DB", 1000000);
			addBook(db, title, author, cover, $scope.isbnInput);
	  		$('#searchModal').modal('close');
	  		document.location.href="#library"
	  	});
	}

}