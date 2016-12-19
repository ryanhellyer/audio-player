
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
 */
function changePlayerTimeStamp( percentage_complete ) {

	// Set duration time
	durationTime.innerHTML = audioPlayer.duration;

	// Set current time
	var time = Math.floor( audioPlayer.currentTime * 10 );
	currentTime.innerHTML = time / 10;

	// Set time elapsed line length
	var lineLength = ( percentage_complete / 100 ) * timeControl.clientWidth;
	timeElapsedLine.style.width = lineLength + "px";

	// Set audio player time stamp
//	audioPlayer.currentTime = ( percentage_complete / 100 ) * audioPlayer.duration;

}

function loadSong( audioFile ) {
	var fileLocation = audioFileDir + audioFile + ".mp3";
	audioPlayer.setAttribute('src', fileLocation );
	audioPlayer.play();

}
