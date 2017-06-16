function bookDetailsController(){
	var urlParams = window.location.href.split('/');
	var id = urlParams[urlParams.length-1]; // Get the last params, this is the id

	var buildBookDetailsPage = function(title){
		alert(title);
    }
    
    // Create or get the library DB
    var db = window.openDatabase("library_dev", "1.0", "Library DB", 1000000);
    // Function define in dbHandler.js
    getBookDetails(db, id, buildBookDetailsPage);
}