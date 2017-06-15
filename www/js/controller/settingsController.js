function settingsController($scope){
	// Change the app title on the header
	$("header h5.title").text("Settings");

	// Create or get the library DB
    var db = window.openDatabase("library_dev", "1.0", "Library DB", 1000000);
    getServerNameAndSetContentInInput(db);

    $scope.save = function(){
    	updateSettings(db, $("#settingsForm #serverName").val());
    }
	
}