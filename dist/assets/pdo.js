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

	// numToWords :: (Number a, String a) => a -> String
	let numToWords = n => {

		var arr = x => Array.from(x);
		var num = x => Number(x) || 0;
		var str = x => String(x);
		var isEmpty = xs => xs.length === 0;
		var take = n => xs => xs.slice(0,n);
		var drop = n => xs => xs.slice(n);
		var reverse = xs => xs.slice(0).reverse();
		var comp = f => g => x => f (g (x));
		var not = x => !x;
		var chunk = n => xs =>
		  isEmpty(xs) ? [] : [take(n)(xs), ...chunk (n) (drop (n) (xs))];
	  
	  let a = [
	    '', 'one', 'two', 'three', 'four',
	    'five', 'six', 'seven', 'eight', 'nine',
	    'ten', 'eleven', 'twelve', 'thirteen', 'fourteen',
	    'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
	  ];
	  
	  let b = [
	    '', '', 'twenty', 'thirty', 'forty',
	    'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
	  ];
	  
	  let g = [
	    '', 'thousand', 'million', 'billion', 'trillion', 'quadrillion',
	    'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion'
	  ];
	  
	  // this part is really nasty still
	  // it might edit this again later to show how Monoids could fix this up
	  let makeGroup = ([ones,tens,huns]) => {
	    return [
	      num(huns) === 0 ? '' : a[huns] + ' hundred ',
	      num(ones) === 0 ? b[tens] : b[tens] && b[tens] + '-' || '',
	      a[tens+ones] || a[ones]
	    ].join('');
	  };
	  
	  let thousand = (group,i) => group === '' ? group : `${group} ${g[i]}`;
	  
	  if (typeof n === 'number')
	    return numToWords(String(n));
	  else if (n === '0')
	    return 'zero';
	  else
	    return comp (chunk(3)) (reverse) (arr(n))
	      .map(makeGroup)
	      .map(thousand)
	      .filter(comp(not)(isEmpty))
	      .reverse()
	      .join(' ');
	};

	// PDO line
	$('.main-content').append("<div class='pdo-line'></div>");

	// $("#collection-title").text("Things");
	// Set copy for collection header
	var href_loc = window.location.href.split("/")[window.location.href.split("/").length - 1];
	if (href_loc === "shop") {

		var collectionMetaHtml = "<div class='collection-meta'><p id='meta-things'>things</p></div>";
		$(collectionMetaHtml).insertAfter('#shopify-section-header');

		// collection mouseover states
		$('.grid-view-item').mouseover(function(){
			$('.grid-view-item').not(this).each(function(){
				$(this).addClass('ten-percent-alpha');
			});
			
			// convert to numerical representation.
			var priceStr = $(this).find(".grid-view-item__title").data("price"),
				priceNum = Number(priceStr.slice(1).split(',').join("").split('.')[0]),
				priceWord = numToWords(priceNum),
				priceUSD = priceWord + "usd"; 

			$('#meta-things').html(priceUSD);

		})

		$('.grid-view-item').mouseleave(function(){
			$('.grid-view-item').removeClass('ten-percent-alpha');
			$('#meta-things').html("things");
		})

		// random padding on load wrt page width
		var paddingRange = ($(window).width() < 750) ? 10 : 25;
		$('.masonary-grid__item').each((i, el) => { 
			var val = String(Math.floor(Math.random() * paddingRange) + 10) + "%";  // magic numbers feel p good
			$(el).css( "padding", val )
		});
		// shuffle on load
		$('.shuffle .masonary-grid__item').shuffle();

		// fadeout 'things' near bottom of scroll on mobile
		$(window).scroll(function() {
			var scrollPercent = ($(window).width() < 750) ? 0.75 : 0.85;
			if (window.scrollY / $('body').height() > scrollPercent) {
				$('.collection-meta').addClass('zero-alpha');
			}
			else {
				$('.collection-meta').removeClass('zero-alpha');
			}
		});

	}
});
