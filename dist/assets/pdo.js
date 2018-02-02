// Custom JS elements for PDO site
// Alex Norton 2018

$(function() {
	console.log('hello');
	$("#collection-title").text("Things");
	// how to create a random grid system
	// a simple algorithm
	// » create a new hierarchy for the section header element within the template
	// position: fixed;
 //    width: 100%;
 //    height: 100%;
 //    z-index: 1;
 //    padding-top: 40%;
 //    font-size: 48px;


 	// random padding
 	$('.masonary-grid__item').each((i, el) => { var val = String(Math.floor(Math.random() * 128)) + "px";  $(el).css( "padding", val ) });
 	// needs an evt listener: onResize » padding == % vh
 	// nah, actually go w discrete break points
 	// make it tween :)
});
