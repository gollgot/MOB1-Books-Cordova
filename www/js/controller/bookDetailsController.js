function bookDetailsController($scope){

	var urlParams = window.location.href.split('/');
	var id = urlParams[urlParams.length-1]; // Get the last params, this is the id

	
	var buildBookDetailsPage = function(title, author, cover, favorite, read, rate, isbn, comment){
		$("section.bookDetails .details p.title").text(title);
		$("section.bookDetails .details p.author").text(author);
		if(hasInternet() && cover != "Inconnu"){
			$("section.bookDetails img.cover").attr("src", cover);
		}
		if(read){
			$("section.bookDetails .details i.eye").removeClass("no-read").addClass("read");
		}
		if(favorite){
			$("section.bookDetails .details i.star").removeClass("no-favorite").addClass("favorite");
		}
		$("section.bookDetails .details input.rate").val(rate);
		$("section.bookDetails textarea.personalNotes").val(comment);
    }
    
    // Create or get the library DB
    var db = window.openDatabase("library_dev", "1.0", "Library DB", 1000000);
    // Function define in dbHandler.js
    getBookDetails(db, id, buildBookDetailsPage);
}