function hasInternet() {
    var internet = false;
    $.ajax({
        url:"https://www.googleapis.com/books/v1/volumes?q=isbn:1234",
        timeout:5000,   //timeout to 5s
        type: "GET",
        cache: false,
        async: false // Mandatory, we want to wait the success callback before return the internet variable
    }).success(function(data, textStatus, xhr){
        if(xhr.status == 200){
            internet = true;
        }
    }); 
    
    return internet;
}