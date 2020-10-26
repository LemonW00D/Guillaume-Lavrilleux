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
	}

	PathLoader.prototype.setProgress = function( val, callback ) {
		this._draw(val);
		if( callback && typeof callback === 'function' ) {
			// give it a time (ideally the same like the transition time) so that the last progress increment animation is still visible.
			setTimeout( callback, 200 );
		}
	}

	PathLoader.prototype.setProgressFn = function( fn ) {
		if( typeof fn === 'function' ) { fn( this ); }
	}

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
					progress = Math.min( progress + Math.random() * 1, 1 ); /*0.05, 1*/

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


/* WAVE ANIMATION */
(function(window) {

	'use strict';

	function init() {
		var siriWave = new SiriWave({
			container: document.getElementById('wavebg'),
			//cover: true,
			speed: 0.01,
			color: '#4d61c5',
			frequency: 3,
			amplitude: 0.5,
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

$('.portfolio-nav').click(function () {
  $('html, body').animate({
    scrollTop: $('#portfolio').offset().top
  }, 100);
});

$('.contact-nav').click(function () {
  $('html, body').animate({
    scrollTop: $('#contact').offset().top
  }, 100);
});



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