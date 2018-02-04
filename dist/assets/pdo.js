// Custom JS elements for PDO site
// Alex Norton 2018

$(function() {
	// $ utils
	$.fn.shuffle = function() {
 
        var allElems = this.get(),
            getRandom = function(max) {
                return Math.floor(Math.random() * max);
            },
            shuffled = $.map(allElems, function(){
                var random = getRandom(allElems.length),
                    randEl = $(allElems[random]).clone(true)[0];
                allElems.splice(random, 1);
                return randEl;
           });
 
        this.each(function(i){
            $(this).replaceWith($(shuffled[i]));
        });
 
        return $(shuffled);
 
    };


	// Set copy for collection header
	// $("#collection-title").text("Things");
	var collectionHeaderHtml = "<div class='collection-header'><p>things</p></div>";
	$(collectionHeaderHtml).insertAfter('#shopify-section-header');

	// how to create a random grid system
	// a simple algorithm
	// » create a new hierarchy for the section header element within the template
	// position: fixed;
 //    width: 100%;
 //    height: 100%;
 //    z-index: 1;
 //    padding-top: 40%;
 //    font-size: 48px;


 	// random padding on load
 	$('.masonary-grid__item').each((i, el) => { 
 		var val = String(Math.floor(Math.random() * 25) + 10) + "%";  // magic numbers feel p good
 		$(el).css( "padding", val )
 	});
 	// shuffle on load
 	$('.shuffle .masonary-grid__item').shuffle();
});
