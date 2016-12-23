(function () {

	/**
	 * Set initial audio player settings.
	 */
	window.addEventListener(
		'load',
		function (){

			// Loop through and find current posts audio file to use (use stored one if one non-audio page)
			var audioFile = localStorage.getItem( 'current-audio' );
			for ( slug in audio_posts ) {

				if ( page_id == audio_posts[ slug ][ 'id' ] ) {
					audioFile = slug;
				}
			}

			loadAudioFile( audioFile );

			durationTime.innerHTML = Math.floor( audioPlayer.duration * 10 ) / 10;

			// Set audio player volume
			var volume = localStorage.getItem( 'volume' );
			changeVolume( volume );

			// Set mute button class
			if ( "true" == localStorage.getItem( 'mute') ) {
				mute.className = "muted icon-button";
			} else {
				mute.className = "icon-button";
			}

			// Set repeat button
			if ( "true" == localStorage.getItem( 'repeat' ) ) {
				audioPlayer.loop = true;
				repeatButton.className = "active icon-button";
			} else {
				audioPlayer.loop = false;
				repeatButton.className = "icon-button";
			}

			// Make footer visible - kept hidden to avoid things flashing whilst it's loading
			var footer = document.getElementById( "footer" );
			footer.style.visibility = "visible";
		}
	);


function addClass(name, element) {
  var classesString;
  classesString = element.className || "";
  if (classesString.indexOf(name) === -1) {
    element.className += " " + name;
  }
}


	/**
	 * Handle clicks.
	 */
	window.addEventListener(
		'click',
		function ( e ){

			// Handling current-menu-item classes
			if ( undefined != e.target.parentNode.classList ) {

				// Remove all existing active items first
				var all_lis = e.target.parentNode.parentNode.childNodes;
				for (i = 0; i < all_lis.length; i++) {

					if ( undefined != all_lis[ i ].classList ) {
						all_lis[ i ].classList.remove("current-menu-item");
					}

				}

				// Setting clicked item as active
				addClass( "current-menu-item", e.target.parentNode );

			}

			// All clicks off of side menu make it close
			if ( "hamburger-menu" == e.target.id ) {
				hamburgerMenu.className = "open";
			} else if ( 'BODY' == e.target.parentNode.tagName || 'HTML' == e.target.parentNode.tagName ) {
				hamburgerMenu.className = "";
			} else if (
				( null != e.target.parentNode && "hamburger-menu" == e.target.parentNode.id )
				||
				( null != e.target.parentNode.parentNode && "hamburger-menu" == e.target.parentNode.parentNode.id )
				||
				( null != e.target.parentNode.parentNode.parentNode && "hamburger-menu" == e.target.parentNode.parentNode.parentNode.id )
//				||
//				( null != e.target.parentNode.parentNode.parentNode.parentNode && "hamburger-menu" == e.target.parentNode.parentNode.parentNode.parentNode.id )
//				||
//				( null != e.target.parentNode.parentNode.parentNode.parentNode.parentNode && "hamburger-menu" == e.target.parentNode.parentNode.parentNode.parentNode.parentNode.id )
			) {
				hamburgerMenu.className = "open";
			} else {
				hamburgerMenu.className = "";
			}


			// Process button clicks
			if ( "mute" == e.target.id ) {
				// Mute button

				if ( "true" == localStorage.getItem( 'mute' ) ) {
					localStorage.setItem( 'mute', false );
					audioPlayer.volume = ( volumeValue.innerHTML / 100 );
					e.target.className = "icon-button";
				} else {
					localStorage.setItem( 'mute', true );
					audioPlayer.volume = 0;
					e.target.className = "muted icon-button";
				}

			} else if ( "play" == e.target.id ) {
				// Play button

				if ( "paused icon-button" == e.target.className ) {
					e.target.className = "icon-button";
					audioPlayer.play();
				} else {
					audioPlayer.pause();
					e.target.className = "paused icon-button";
				}

			} else if ( "hamburger" == e.target.className ) {
				// Hamburger buttons (there's more than one of them)

				if ( "" == hamburgerMenu.className ) {
					hamburgerMenu.className = "open";
				} else {
					hamburgerMenu.className = "";
				}

			} else if ( "repeat-button" == e.target.id ) {
				// Repeat button

				if ( true == audioPlayer.loop ) {
					audioPlayer.loop = false;
					repeatButton.className = "icon-button";
					localStorage.setItem( 'repeat', false );
				} else {
					audioPlayer.loop = true;
					repeatButton.className = "active icon-button";
					localStorage.setItem( 'repeat', true );
				}

			} else if ( "previous" == e.target.id ) {
				// Previous button

				if ( 2 < audioPlayer.currentTime ) {
					audioPlayer.currentTime = 0;
				} else {


										// Change to the other file
										if (
											"song" == localStorage.getItem( 'current-audio' )
											||
											null == localStorage.getItem( 'current-audio' )
										) {
											var audioFile = "song2";
										} else {
											var audioFile = "song";
										}
										loadAudioFile( audioFile );
				}
			} else if ( "next" == e.target.id ) {
				// Next button


										// Change to the other file
										if (
											"song" == localStorage.getItem( 'current-audio' )
											||
											null == localStorage.getItem( 'current-audio' )
										) {
											var audioFile = "song2";
										} else {
											var audioFile = "song";
										}
										loadAudioFile( audioFile );


			} else if ( "thumbs-up" == e.target.id ) {
				// Thumbs up button
				rating_ajax_request( 'up' );
			} else if ( "thumbs-down" == e.target.id ) {
				// Thumbs down button
				rating_ajax_request( 'down' );
			}

		}
	);

	/**
	 * Live update stuff.
	 */
	setInterval(
		function() {

			var roundedTime = Math.floor( audioPlayer.currentTime * 10 );

			// Set current time box
			currentTime.innerHTML = roundedTime / 10;

			// Set time slider
			var percentage_complete = ( audioPlayer.currentTime / audioPlayer.duration ) * 100;

			var width = timeControl.clientWidth;
			var span = timeControl.childNodes[1];
			var setting = ( ( percentage_complete / 100 ) * width ) - span.clientWidth;
			span.style.left = setting + "px";

			// If audio has ended, then set play button to paused
			if ( true == audioPlayer.ended ) {
				play.className = "paused icon-button";
			}

			changePlayerTimeStamp( percentage_complete, false );

		},
		( 1000 / 30 ) // Second number is FPS
	);

	/**
	 * Sporadically update stuff.
	 */
	setInterval(
		function() {

			// Save volume to local database
			localStorage.setItem( 'volume', volumeValue.innerHTML );

		},
		1000 * 1
	);

	/**
	 * Create sliders.
	 */
	Slider('volume-control', changeVolume );
	Slider('time-stamp', changePlayerTimeStamp );

})();
