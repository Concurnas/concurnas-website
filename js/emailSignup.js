(function($) {
	//on enter, spawn modal
	var input = document.getElementById("emailSignup");
	input.addEventListener("keyup", function(event) {
	  if (event.keyCode === 13) {
	    event.preventDefault();
	    document.getElementById("emailSignupBtn").click();
	  }
	});
	//prepop email address
	$('#exampleModal').on('show.bs.modal', function () {
	   $("#mce-EMAIL").val($("#emailSignup").val().trim());
	})

	//validation
	window.fnames = new Array(); 
	window.ftypes = new Array();
	fnames[0]='EMAIL';
	ftypes[0]='email';
	fnames[1]='FNAME';
	ftypes[1]='text';
	fnames[2]='LNAME';
	ftypes[2]='text';
}(jQuery));
var $mcj = jQuery.noConflict(true);