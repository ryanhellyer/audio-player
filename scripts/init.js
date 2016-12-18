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
					e.target.className = "";
			    } else {
				    localStorage.setItem( 'mute', true );
					audioPlayer.volume = 0;
					e.target.className = "muted";
			    }

			} else if ( "play" == e.target.id ) {
				// Play button

				if ( "paused" == e.target.className ) {
					e.target.className = "";
					audioPlayer.play();
				} else {
					audioPlayer.pause();
					e.target.className = "paused";
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
