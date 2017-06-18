# Validations
Here is some real cases to prove that the application works in specific real situations. 

## Case 1 : The app must use a mobile componement and datas are in a local storage.
You are in a library and you see an interesting book, you want to add it on the application. You open the app and clic to the "+" bottom tab, and touch the "Scanner" button. Now the camera will activated and you can easily scan the barcode with the ISBN number of your book and it will appear in the field. You just have to clic on the "Rechercher" button to search the book and import it on your personnal library. You can quit and comeback on the app, all your books are always here. You also can touch a book in the list, and change some informations (favorite / rate / if you read the book / add a comment) and save them. You can even delete a book.

## Case 2 : The app manage correctly the case of there is no internet or no API connection
You are in a lost valley, you open the app and you can see all your books. All the book's images are not good (there are default images), but the datas are good. You try to add a new book but an error appear on the screen. This is completely normal because you don't have internet connection.

## Case 3 : The user can change the server name of the API
You are at home and you built your home server with an books API. You open the app and clic on the top right settings button. You type the new server address and save it. You launch a book search, there is an error. This is normal because you are not in your local wifi, so the server is not reachable. You connect your mobile to the wifi, retry a book search and it works.
