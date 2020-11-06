/* PRELOADER */
( function( window ) {
	
	'use strict';

	function PathLoader( el ) {
		this.el = el;
		// clear stroke
		this.el.style.strokeDasharray = this.el.style.strokeDashoffset = this.el.getTotalLength();
	}

	PathLoader.prototype._draw = function( val ) {
		this.el.style.strokeDashoffset = this.el.getTotalLength() * ( 1 - val );
	};

	PathLoader.prototype.setProgress = function( val, callback ) {
		this._draw(val);
		if( callback && typeof callback === 'function' ) {
			// give it a time (ideally the same like the transition time) so that the last progress increment animation is still visible.
			setTimeout( callback, 200 );
		}
	};

	PathLoader.prototype.setProgressFn = function( fn ) {
		if( typeof fn === 'function' ) { fn( this ); }
	};

	// add to global namespace
	window.PathLoader = PathLoader;

})( window );

(function() {

	var support = { animations : Modernizr.cssanimations },
		container = document.getElementById( 'ip-container' ),
		header = container.querySelector( 'header.ip-header' ),
		loader = new PathLoader( document.getElementById( 'ip-loader-circle' ) ),
		animEndEventNames = { 'WebkitAnimation' : 'webkitAnimationEnd', 'OAnimation' : 'oAnimationEnd', 'msAnimation' : 'MSAnimationEnd', 'animation' : 'animationend' },
		// animation end event name
		animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ];

	function init() {
		var onEndInitialAnimation = function() {
			if( support.animations ) {
				this.removeEventListener( animEndEventName, onEndInitialAnimation );
			}

			startLoading();
		};

		// disable scrolling
		window.addEventListener( 'scroll', noscroll );

		// initial animation
		classie.add( container, 'loading' );

		if( support.animations ) {
			container.addEventListener( animEndEventName, onEndInitialAnimation );
		}
		else {
			onEndInitialAnimation();
		}
	}

	function startLoading() {
		// simulate loading something..
		var simulationFn = function(instance) {
			var progress = 0,
				interval = setInterval( function() {
					progress = Math.min( progress + Math.random() * 0.125, 1 ); /*0.025, 1*/

					instance.setProgress( progress );

					// reached the end
					if( progress === 1 ) {
						classie.remove( container, 'loading' );
						classie.add( container, 'loaded' );
						clearInterval( interval );

						var onEndHeaderAnimation = function(ev) {
							if( support.animations ) {
								if( ev.target !== header ) return;
								this.removeEventListener( animEndEventName, onEndHeaderAnimation );
							}

							classie.add( document.body, 'layout-switch' );
							window.removeEventListener( 'scroll', noscroll );
						};

						if( support.animations ) {
							header.addEventListener( animEndEventName, onEndHeaderAnimation );
						}
						else {
							onEndHeaderAnimation();
						}
					}
				}, 80 );
		};

		loader.setProgressFn( simulationFn );
	}
	
	function noscroll() {
		window.scrollTo( 0, 0 );
	}

	init();

})();


/* WAVE ANIMATION x3 */
(function(window) {

	'use strict';

	function init() {
		var siriWave = new SiriWave({
			container: document.getElementById('wavebg1'),
			//cover: true,
			speed: 0.0075,
			color: '#fc7420',
			frequency: 4,
			amplitude: 0.9,
			autostart: true
		});
	}	

	init();

})(window);

(function(window) {

	'use strict';

	function init() {
		var siriWave = new SiriWave({
			container: document.getElementById('wavebg2'),
			//cover: true,
			speed: 0.0075,
			color: '#fc7420',
			frequency: 4,
			amplitude: 0.9,
			autostart: true
		});
	}	

	init();

})(window);

(function(window) {

	'use strict';

	function init() {
		var siriWave = new SiriWave({
			container: document.getElementById('wavebg3'),
			//cover: true,
			speed: 0.0075,
			color: '#fc7420',
			frequency: 4,
			amplitude: 0.9,
			autostart: true
		});
	}	

	init();

})(window);


/* NAVBAR BACKGROUND COLOR */
jQuery( document ).ready(function() {
	$(window).scroll(function(){
	$('.topnav, .navbar-collapse, .img-nav').toggleClass('nav-scroll-active', $(this).scrollTop() > 50);
	});
});



/* GO TOP ENTRANCE */
jQuery( document ).ready(function() {
	$(window).scroll(function(){
	$('.gototop').toggleClass('arrow-active', $(this).scrollTop() > 350);
	});
});



/* NAVBAR LINKS */
$('.home-nav').click(function () {
    $('html, body').animate({
      scrollTop: $('#home').offset().top
    }, 100);
  });
  
$('.about-nav').click(function () {
  $('html, body').animate({
    scrollTop: $('#about').offset().top
  }, 100);
});

$('.works-nav').click(function () {
  $('html, body').animate({
    scrollTop: $('#works').offset().top
  }, 100);
});

$('.contact-nav').click(function () {
  $('html, body').animate({
    scrollTop: $('#contact').offset().top
  }, 100);
});


/* NAVBAR SOUND 
$(".nav-item")
  .each(function(i) {
    if (i != 0) { 
      $("#beep-two")
        .clone()
        .attr("id", "beep-two" + i)
        .appendTo($(this).parent()); 
    }
    $(this).data("beeper", i);
  })
  .mouseenter(function() {
    $("#beep-two" + $(this).data("beeper"))[0].play();
  });
$("#beep-two").attr("id", "beep-two0");
*/


/* MUTE BUTTON ANIMATION 
$('#sound-button').click(function() {
    $("i", this).toggleClass("fas fa-volume-mute fas fa-volume-up");
});
*/

/* MUTE BUTTON ACTIVATION */
/* son muted au chargement 
$(function(){
    jQuery(document).ready(function () {
		$("audio").prop("muted", true);
	});
});
*/

/* bouton toggle mute/unmute sound 
$(function(){
    jQuery('#sound-button').click(function () {
        if( $("audio").prop('muted') ) {
			$("audio").prop('muted', false);
	  } else {
		$("audio").prop('muted', true);
	  }
    });
});
*/


/* AOS PROPERTIES */
AOS.init({
  duration: 800
});
/* Disable animation on screen less than 992px */
AOS.init({
  disable: function () {
    var maxWidth = 992;
    return window.innerWidth < maxWidth;
  }
});



/* SCROLLSPY */
$('body').scrollspy({
  target: '.fixed-top'
});


/* CAROUSEL */
$('.carousel').carousel({
	interval: 7500,
	keyboard: true,
	pause: "hover",
	wrap: true,
	touche: true,
	cycle: 1000,
});



/* TOOLTIPS */
$(function () {
	$('[data-toggle="tooltip"]').tooltip();
});
jQuery(document).ready(function($) {
	$(".my-tooltip").tooltip({
	  html: "true",
	  placement: "auto-right",
	  delay: {"show": 300, "hide": 100}
	});
});


/* EMAILJS */
(function(){
  emailjs.init('USER-ID');
})();

window.onload = function() {
  document.getElementById('contact-form').addEventListener('submit', function(event) {
      event.preventDefault();
      emailjs.sendForm('SERVICE', 'TEMPLATE', this);
      alert("Votre message a bien été envoyé !");
      const form = document.getElementById("contact-form");
      form.reset();
  });
};