$(document).ready(function(){
	$("body").on("click", "div#slider li a", function(){
		//var id = $(this).val();
		var id = $(this.hash).prop("id");
		$('html,body').animate({ scrollTop: $("div#" + id).offset().top }, 900, "swing");
	})
});