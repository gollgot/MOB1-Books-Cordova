function bookDetailsController(){
	var params = window.location.href.split('/');
	var id = params[params.length-1];
	alert(id);
}