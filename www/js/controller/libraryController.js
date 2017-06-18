function libraryController(){
	// Change the app title on the header
	$("header h5.title").text("Ma bibliothèque");
	// Create or get the library DB
    var db = window.openDatabase("library_prod", "1.0", "Library DB", 1000000);
    // We init (create or get) the table (all function provides from the dbHandler.js file)
    initTable(db);
    createBookList(db);
}