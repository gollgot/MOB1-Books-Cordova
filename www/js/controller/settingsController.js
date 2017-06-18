function settingsController($scope){
	// Change the app title on the header
	$("header h5.title").text("Settings");

	// Create or get the library DB
    var db = window.openDatabase("library_prod", "1.0", "Library DB", 1000000);
    
    // Callback function, called when we do the sql request
    var setServerNameToInput = function(serverName){
    	$("#settingsForm #serverName").val(serverName);
    }

    // Function define in dbHandler.js
    getServerName(db, setServerNameToInput);

    $scope.save = function(){
    	updateSettings(db, $("#settingsForm #serverName").val());
    }
	

}