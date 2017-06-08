function libraryController(){
	// Create or get the library DB
    var db = window.openDatabase("library", "1.0", "Library DB", 1000000);
    // We init (create or get) the table (all function provides from the dbHandler.js file)
    initTable(db);
    populate(db); /* ONLY FOR DEVELOPMENT */
    createBookList(db);
}