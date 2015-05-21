console.log("hi");

$("#validationForm").submit(function(event) {
	event.preventDefault();
	window.location.href = "home.html";
})