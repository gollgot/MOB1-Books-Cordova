/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var db = null;

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        
        db = window.sqlitePlugin.openDatabase({name: 'library.db', location: 'default'});

        initTable(db);
        //populate(db);
        createBookList(db);
        //show(db);
        //populate(db);*/

    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        /*var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');*/

        console.log('Received Event: ' + id);
    }
};

app.initialize();

function initTable(db){
    db.transaction(function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS books (title, author, poster, favorite, saw, rate)');
    }, function(error) {
        alert('Transaction ERROR: ' + error.message);
    }, function() {
        alert('Initialisation table Books OK');
    });
}

function populate(db){
    db.transaction(function(tx) {
        tx.executeSql('INSERT INTO books VALUES (?,?,?,?,?,?)',[
            'Harry Potter à l\'école des sorciers',
            'J.K Rowling',
            'harry_potter_1.jpg',
            1,
            0,
            9
        ]);
    }, function(error) {
        alert('Transaction ERROR: ' + error.message);
    }, function() {
        alert('Populated database OK');
    });
}

function show(db){
    db.transaction(function(tx) {
        tx.executeSql('SELECT count(title) as count  FROM books', [], function(tx, rs) {
            alert('name: ' + rs.rows.item(0).count);
        }, function(tx, error) {
            alert('SELECT error: ' + error.message);
        });
    });
}

function createBookList(db){
    
    getNbBooks();
    
    // Get ne nb of books we have on the DB
    function getNbBooks(){
        db.transaction(function(tx) {
            tx.executeSql('SELECT count(title) as count  FROM books', [], function(tx, rs) {
                createList(rs.rows.item(0).count);
            }, function(tx, error) {
                alert('SELECT error: ' + error.message);
            });
        });
    }
    
    // Create the list
    function createList(nbElements){
        db.transaction(function(tx) {
            tx.executeSql('SELECT * FROM books', [], function(tx, rs) {

                var list = $("#book-list");
                for (var i = 0; i < nbElements; i++) {
                    var title = rs.rows.item(i).title;
                    var author = rs.rows.item(i).author;
                    var poster = rs.rows.item(i).poster;
                    var favorite = rs.rows.item(i).favorite;
                    var saw = rs.rows.item(i).saw;
                    var rate = rs.rows.item(i).rate;
                    
                    var cell = `
                        <div class="cell">
                            <i class="favorite fa fa-star" aria-hidden="true"></i>
                            <div class="poster">
                                <img src="img/`+poster+`">
                            </div>
                            <div class="infos">
                                <div class="title">`+title+`</div>
                                <div class="author">`+author+`</div>
                                <div class="other">
                                    <div class="saw">
                                        <i class="fa fa-eye" aria-hidden="true"></i>
                                    </div>
                                    <div class="rate">
                                        <span class="nb1">`+rate+`</span> / <span class="nb2">10</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                     list.html(cell);
                }
                $(".panel").append(list);
                

                
            }, function(tx, error) {
                alert('SELECT error: ' + error.message);
            });
        });
        
        
        
    }

}