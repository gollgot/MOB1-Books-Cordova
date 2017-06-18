function bookDetailsController($scope){

	var urlParams = window.location.href.split('/');
	var id = urlParams[urlParams.length-1]; // Get the last params, this is the id

	// Callback function 
	var buildBookDetailsPage = function(title, author, cover, favorite, read, rate, isbn, comment){
		// Set all data from DB to our HTML elements
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
    var db = window.openDatabase("library_prod", "1.0", "Library DB", 1000000);
    // Function define in dbHandler.js with a callback function
    getBookDetails(db, id, buildBookDetailsPage);

    // When we clic on the delete floating action button
    $scope.delete = function(){
    	// This function is defined in the dbHandler.js
    	deleteBook(db, id);
    	// Redirect to the library View
    	window.location.href = "#library";
    }

    // Change class if we read or no (click on the eye icon)
    $scope.changeRead = function(){
    	if($("section.bookDetails .details i.eye").hasClass("no-read")){
    		$("section.bookDetails .details i.eye").removeClass("no-read").addClass("read");
    	}else{
    		$("section.bookDetails .details i.eye").removeClass("read").addClass("no-read");
    	}
    }

    // Change class if we read or no (click on the eye icon)
    $scope.changeFavorite = function(){
    	if($("section.bookDetails .details i.star").hasClass("no-favorite")){
    		$("section.bookDetails .details i.star").removeClass("no-favorite").addClass("favorite");
    	}else{
    		$("section.bookDetails .details i.star").removeClass("favorite").addClass("no-favorite");
    	}
    }

    // Save all the changes 
    $scope.save = function(){
		var rate = $("section.bookDetails input.rate").val();
		if(rate > 10 || rate < 0 || !rate){
			rate = 0;
		}
		var comment = $("section.bookDetails textarea.personalNotes").val();
		if($("section.bookDetails .details i.eye").hasClass("no-read")){
			var read = 0;
		}else{
			var read = 1;
		}
		if($("section.bookDetails .details i.star").hasClass("no-favorite")){
			var favorite = 0;
		}else{
			var favorite = 1;
		}
		updateBook(db, id, rate, read, favorite, comment);
		window.location.href = "#library";
    }
}