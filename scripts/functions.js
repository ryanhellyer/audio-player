
/**
 * Change the audio volume.
 *
 * @param  int  volume  The volume level to change to (from 0 and 1)
 */
function changeVolume( volume ) {

	// Set audio volume and displayed value
	volumeValue.innerHTML = volume;

	// Display mute icon when volume at zero
	if ( 0 == volume ) {
		mute.className = "muted icon-button";
	} else {
		mute.className = "icon-button";
	}

	audioPlayer.volume = ( volume / 100 );

	// Set volume control position
	var width = volumeControl.clientWidth;
	var span = volumeControl.childNodes[1];
	var setting = ( ( volume / 100 ) * width ) - span.clientWidth;

	span.style.left = setting + "px";
}

/**
 * Change the audio player time stamp.
 *
 * @param  int  percentage_complete  The time completed in percentage
 * param   bool callback true if callback
 */
function changePlayerTimeStamp( percentage_complete, callback = true ) {

	// Set duration time
	durationTime.innerHTML = audioPlayer.duration;

	// Set current time
	var time = Math.floor( audioPlayer.currentTime * 10 );
	currentTime.innerHTML = time / 10;

	// Set time elapsed line length
	var lineLength = ( percentage_complete / 100 ) * timeControl.clientWidth;
	timeElapsedLine.style.width = lineLength + "px";

	// Set audio player time stamp - need to check this this resets the player time constantly, which causes audio glitches
	if ( true == callback ) {
		audioPlayer.currentTime = ( percentage_complete / 100 ) * audioPlayer.duration;
	}

}

/**
 * Load an audio file.
 *
 * @param  string  audioFile  An audio file to load
 */
function loadAudioFile( audioFile ) {

	var fileLocation = audioFileDir + audioFile + ".mp3";

	localStorage.setItem( 'current-audio', audioFile );

	if ( audioPlayer.src != fileLocation ) {

		// Set audio player SRC
		audioPlayer.pause(); // Need to pause it or we get errors on changing SRC
		audioPlayer.setAttribute( 'src', fileLocation );
		audioPlayer.play();

		// Set track description
		for (i = 0; i < trackDescription.childNodes.length; i++) { 

			trackDescription.style.display = "block";
			trackDescription.href = home_url + "/" + audioFile;

			if ( "H2" == trackDescription.childNodes[i][ 'tagName' ] ) {
				trackDescription.childNodes[i].innerHTML = audio_posts[ audioFile ][ 'title' ];
			} else if ( "P" == trackDescription.childNodes[i][ 'tagName' ] ) {
				trackDescription.childNodes[i].innerHTML = audio_posts[ audioFile ][ 'excerpt' ];
			}

		}

		// Set ratings
		thumbsUp.innerHTML = thumbs_up = audio_posts[ audioFile ][ 'thumbs_up' ];
		thumbsDown.innerHTML = thumbs_down = audio_posts[ audioFile ][ 'thumbs_down' ];

	}

}

/**
 * Rating AJAX request.
 * Sent when user clicks thumbs up or thumbs down button.
 *
 * @param  string  rating  up or down
 */
function rating_ajax_request(rating) {

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			if('Rating successful!'==xhttp.responseText){

				// Storing data
				if ( "down" == rating ) {
					thumbsDown.innerHTML = parseInt( thumbsDown.innerHTML ) + 1;
				} else if ( "up" == rating ) {
					thumbsUp.innerHTML = parseInt( thumbsUp.innerHTML ) + 1;
				}


// SHOULD STORE WHICH PAGE THE USER LIKED OR DISLIKED HERE

			}
		}
	};

	// Get current audio ID
	for ( slug in audio_posts ) {

		if ( audioPlayer.src == audioFileDir + slug + ".mp3" ) {
			var audio_id = audio_posts[ slug ][ 'id' ];
		}

	}

	xhttp.open('POST', home_url+'?rating-'+rating+'='+audio_id, true);
	xhttp.send();
}
