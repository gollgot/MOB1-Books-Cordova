/********************
**     DB PART     **
********************/

/**
* Create the books table if it doesn't already exists
*/
function initTable(db){
    db.transaction(function(tx) {
        /*tx.executeSql('DROP TABLE IF EXISTS books'); /* ONLY FOR DEVELOPMENT */
        tx.executeSql('CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title, author, cover, favorite, read, rate, isbn, comment)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY AUTOINCREMENT, serverName)');
        populateSettingsIfFirstTime(db);
    }, function(error) {
        alert('Transaction ERROR: ' + error.message);
    }, function() {
        //alert('Initialisation table Books OK');
    });
}


/**
* populate the settings table with the default serverName if this is the first time
*/
function populateSettingsIfFirstTime(db){
    db.transaction(function(tx) {
        // Get the count of servername (exists if > 0)
        tx.executeSql('SELECT count(serverName) as count  FROM settings', [], function(tx, rs) {
            // Doesn't exists
            if(rs.rows.item(0).count == 0){
                // Set the default serverName
                db.transaction(function(tx) {
                    tx.executeSql('INSERT INTO settings VALUES (?,?)',[
                        null,
                        'https://www.googleapis.com/books/v1/volumes',
                    ]);
                }, function(error) {
                    alert('Transaction ERROR: ' + error.message);
                }, function() {
                });
            }
        }, function(tx, error) {
            alert('SELECT error: ' + error.message);
        });
    });
}


/**
* Get the serverName in the Settings table, and set it in the input of settingsForm
* I cannot return the value to the settingsController, so I change the value after the request ...
*/
function getServerName(db, callback){
    db.transaction(function(tx) {
        tx.executeSql('SELECT serverName FROM settings', [], function(tx, rs) {
            callback(rs.rows.item(0).serverName);
        }, function(tx, error) {
            alert('SELECT error: ' + error.message);
        });
    });
}

/**
* Update the settings
*/
function updateSettings(db, newServerName){
    db.transaction(function(tx) {
        tx.executeSql('UPDATE settings SET serverName = ?', [newServerName], function(tx, rs) {
            alert("Sauvegarde effectué");
        }, function(tx, error) {
            alert('Une erreur est survenue lors de la sauvegarde');
        });
    });
}


/**
* populate the DB with fake datas
*/
function populate(db){
    db.transaction(function(tx) {
        tx.executeSql('INSERT INTO books VALUES (?,?,?,?,?,?,?,?,?)',[
            null,
            'Harry Potter à l\'école des sorciers',
            'J.K Rowling',
            'harry_potter_1.jpg',
            1,
            0,
            7,
            123456,
            ''
        ]);
        tx.executeSql('INSERT INTO books VALUES (?,?,?,?,?,?,?,?,?)',[
            null,
            'le seigneur des anneaux l\'intégrale',
            'J.R.R. Tolkien',
            'seigneur_des_anneaux.jpg',
            0,
            1,
            9,
            123456,
            ''
        ]);
    }, function(error) {
        alert('Transaction ERROR: ' + error.message);
    }, function() {
        //alert('Populated database OK');
    });
}


/**
* Show some infos we want from the DB (for debug)
*/
function show(db){
    db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM books', [], function(tx, rs) {
            alert('name: ' + rs.rows.item(1).id);
        }, function(tx, error) {
            alert('SELECT error: ' + error.message);
        });
    });
}



/**
* Create the #book-list which include a book pear cell. 
*/
function createBookList(db){
    
    create();

    /**
    * Get ne nb of books we have on the DB and call
    * the function which will create the #book-list
    */
    function create(){
        db.transaction(function(tx) {
            tx.executeSql('SELECT count(title) as count  FROM books', [], function(tx, rs) {
                createList(rs.rows.item(0).count);
            }, function(tx, error) {
                alert('SELECT error: ' + error.message);
            });
        });
    }
    
    /**
    * Create the #book-list which include a book pear cell. 
    * We travel all elements on db and create the HTML.
    */
    function createList(nbElements){
        db.transaction(function(tx) {
            tx.executeSql('SELECT * FROM books', [], function(tx, rs) {

                var list = $("#book-list");
                var cell = '';

                if(nbElements == 0){
                    cell += '<p>Aucun livre, vous pouvez en ajouter en allant sur le bouton +</p>';
                }else{
                    // travel all the elements on the DB and create the HTML for the current cell
                    for (var i = 0; i < nbElements; i++) {
                        var id = rs.rows.item(i).id;
                        var title = rs.rows.item(i).title;
                        var author = rs.rows.item(i).author;
                        var cover = rs.rows.item(i).cover;
                        var favorite = rs.rows.item(i).favorite;
                        var read = rs.rows.item(i).read;
                        var rate = rs.rows.item(i).rate;
                        var isbn = rs.rows.item(i).isbn;
                        
                        // concat each cell, to have one big html code with all cell
                        cell += '<a href="#book-details"><div class="cell" data-id="'+id+'">';

                        if(favorite == 0){
                            cell += '<i class="favorite fa fa-star" aria-hidden="true"></i>';
                        }else{
                            cell += '<i class="favorite on fa fa-star" aria-hidden="true"></i>';
                        }

                        cell += `<div class="poster">`;

                        if(hasInternet() && cover != "Inconnu"){
                            cell += '<img src="'+cover+'">';
                        }else{
                            cell += '<img src="img/no_cover.jpg">';
                        }
                        
                        cell += `       
                                </div>
                                <div class="infos">
                                    <div class="title">`+title+`</div>
                                    <div class="author">`+author+`</div>
                                    <div class="other">
                                        <div class="saw">`;
                        if(read == 0){
                            cell += '<i class="fa fa-eye" aria-hidden="true"></i>';
                        }else{
                            cell += '<i class="on fa fa-eye" aria-hidden="true"></i>';
                        }
                        cell += `
                                    </div>
                                    <div class="rate">
                                        <span class="nb1">`+rate+`</span> / <span class="nb2">10</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </a>
                        `;
                        
                    }
                }

                // add all cell to the list
                list.html(cell);
                // Add the list to the current panel (the current application view)
                $(".panel").append(list);

                $(".cell").click(function(){
                    var bookId = $(this).data("id");
                    alert(bookId);
                });
                
            }, function(tx, error) {
                alert('SELECT error: ' + error.message);
            });
        });
        
        
    }

}

/**
* Add a book on the db
*/
function addBook(db, title, author, cover, isbn){
    db.transaction(function(tx) {
        tx.executeSql('INSERT INTO books VALUES (?,?,?,?,?,?,?,?,?)',[
            null,
            title,
            author,
            cover,
            0,
            0,
            0,
            isbn,
            ''
        ]);
    }, function(error) {
        alert('Transaction ERROR: ' + error.message);
    }, function() {
        //alert('Populated database OK');
    });
}


function canGetTheImageOnInternet(isbn){
    var internet = false;
    $.ajax({
        type:"GET",
        url:"https://www.googleapis.com/books/v1/volumes?q=isbn:9780702028441",
        async: false,
    }, function() {
        internet = true;

        console.log("OUI");
    })
    .fail(function() {
        internet = false;
        console.log("NON");
    });
    console.log(internet);
    return internet;

}