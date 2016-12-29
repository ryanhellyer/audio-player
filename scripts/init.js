(function () {

	/**
	 * Set initial audio player settings.
	 */
	window.addEventListener(
		'load',
		function (){

			// Loop through and find current posts audio file to use (use stored one if on non-audio page)
			audioFile = get_local_storage( 'current-audio' );
			for ( slug in audio_posts ) {

				if ( page_id == audio_posts[ slug ][ 'id' ] ) {
					audioFile = slug;
				}

			}

			// Arbitrarily grab a default audio file if none exists yet (normal when visiting a non audio page withhout ever visiting an audio page)
			if ( null == audioFile ) {

				for ( var slug in audio_posts ) {

					// Grab the first audio file we can find, then bail out of the loop
					audioFile = slug;
					break;

				}

			}

			// Set player to paused if they didn't actually ask to play anything specifically
			if ( "audio" != post_type ) {
				loadAudioFile( audioFile, true );
			} else {
				loadAudioFile( audioFile );
			}

			durationTime.innerHTML = Math.floor( audioPlayer.duration * 10 ) / 10;

			// Set audio player volume
			var volume = get_local_storage( 'audio_volume' );
			changeVolume( volume );

			// Only show equalizer on audio posts (but need to keep in place, to avoid it glitching on switching pages)
			if ( "audio" == post_type ) {
				canvas.style.display = "block";
			} else {
				canvas.style.display = "none";
			}

			// Set repeat button
			if ( "true" == get_local_storage( 'repeat' ) ) {
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

	/**
	 * Handle clicks.
	 */
	window.addEventListener(
		'click',
		function ( e ){

			// Handling current-menu-item classes
			if ( "LI" == e.target.parentNode.tagName ) {

				// Remove all existing active items first
				var all_lis = document.getElementsByTagName( "li" );
				for (i = 0; i < all_lis.length; i++) {
					if ( e.target.href == all_lis[ i ].childNodes[0].href ) {
						all_lis[ i ].classList.add("current-menu-item");
					} else {
						all_lis[ i ].classList.remove("current-menu-item");
					}

				}

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
//				||
//				( null != e.target.parentNode.parentNode.parentNode && "hamburger-menu" == e.target.parentNode.parentNode.parentNode.id )
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

				changeVolume( 0 );

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
					set_local_storage( 'repeat', false );
				} else {
					audioPlayer.loop = true;
					repeatButton.className = "active icon-button";
					set_local_storage( 'repeat', true );
				}

			} else if ( "previous" == e.target.id ) {
				// Previous button

				if ( 2 < audioPlayer.currentTime ) {
					audioPlayer.currentTime = 0;
				} else {

					// Find previous audio file
/*
					var grab_next_iteration = '';
					for ( slug in audio_posts ) {

						// Yuss! Next file was found
						if ( true == grab_next_iteration ) {
							audioFile = slug;
							loadAudioFile( audioFile, false );
							grab_next_iteration = false;
							break;
						}

						// This is our current post, so lets grab the one after it
						if ( audioFile == slug ) {
							grab_next_iteration = true;
						}

					}

					// We overshot (must have been at end of list), so need to start from beginning again
					if ( true == grab_next_iteration ) {

						for ( slug in audio_posts ) {
							audioFile = slug;
							loadAudioFile( audioFile, false );
							grab_next_iteration = false;
							break;
						}

					}
*/
				}
			} else if ( "next" == e.target.id ) {
				// Next button

				// Find next audio file
				var grab_next_iteration = '';
				for ( slug in audio_posts ) {

					// Yuss! Next file was found
					if ( true == grab_next_iteration ) {
						audioFile = slug;
						loadAudioFile( audioFile, false );
						grab_next_iteration = false;
						break;
					}

					// This is our current post, so lets grab the one after it
					if ( audioFile == slug ) {
						grab_next_iteration = true;
					}

				}

				// We overshot (must have been at end of list), so need to start from beginning again
				if ( true == grab_next_iteration ) {

					for ( slug in audio_posts ) {
						audioFile = slug;
						loadAudioFile( audioFile, false );
						grab_next_iteration = false;
						break;
					}

				}

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
			if ( volumeValue.innerHTML != get_local_storage( 'audio_volume' ) ) {
				set_local_storage( 'audio_volume', volumeValue.innerHTML );
			}

		},
		1000 * 1
	);

	/**
	 * Create sliders.
	 */
	Slider('volume-control', changeVolume );
	Slider('time-stamp', changePlayerTimeStamp );

})();
