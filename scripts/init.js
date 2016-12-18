(function () {

	/**
	 * Set initial audio player settings.
	 */
	window.addEventListener(
		'load',
		function (){
			durationTime.innerHTML = Math.floor( audioPlayer.duration * 10 ) / 10;

			// Set default volume
		    var volume = localStorage.getItem( 'volume');
		    volume = volume.substring( 0, volume.length - 1 );
			changeVolume( volume );

			// Set audio player volume
			var volume = localStorage.getItem( 'volume' );
			changeVolume( volume );

			// Set mute button class
			if ( "true" == localStorage.getItem( 'mute') ) {
				mute.className = "muted icon-button";
			} else {
				mute.className = "icon-button";
			}

			// Make footer visible - kept hidden to avoid things flashing whilst it's loading
			var footer = document.getElementById( "footer" );
			footer.style.display = "block";
		}
	);

	/**
	 * Handle clicks.
	 */
	window.addEventListener(
		'click',
		function ( e ){

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

			changePlayerTimeStamp( percentage_complete );

		},
		100
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
