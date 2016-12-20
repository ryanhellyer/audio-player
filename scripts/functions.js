
/**
 * Change the audio volume.
 *
 * @param  int  volume  The volume level to change to (from 0 and 1)
 */
function changeVolume( volume ) {

	// Set audio volume and displayed value
	volumeValue.innerHTML = volume;

	// If muted, then set player volume to zero, otherwise set to chosen value
    if ( "true" == localStorage.getItem( 'mute' ) ) {
		audioPlayer.volume = 0;
		mute.className = "muted icon-button";
	} else {
		audioPlayer.volume = ( volume / 100 );
		mute.className = "icon-button";
	}

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

	audioPlayer.pause(); // Need to pause it or we get errors on changing SRC
	audioPlayer.setAttribute( 'src', fileLocation );
	audioPlayer.play();

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
				document.getElementById('thumbs').innerHTML = 'Thanks for your feedback :)';

				// Storing data


// SHOULD STORE WHICH PAGE THE USER LIKED OR DISLIKED HERE

			}
		}
	};
	xhttp.open('POST', home_url+'?rating-'+rating+'='+page_id, true);
	xhttp.send();
}
