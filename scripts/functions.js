
/**
 * Change the audio volume.
 *
 * @param  int  volume  The volume level to change to (from 0 and 1)
 */
function changeVolume( volume ) {

	// Set audio volume and displayed value
	document.getElementById("volume-value").innerHTML = volume + '%';
	document.getElementById("audio-player").volume = ( volume / 100 );

	// Set volume control position
	var volumeControl = document.getElementById("volume-control");
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

	var audioPlayer = document.getElementById( "audio-player" );

	// Set duration time
	var durationTime = document.getElementById( "duration-time" );
	durationTime.innerHTML = audioPlayer.duration;

	// Set current time
	var currentTime = document.getElementById( "current-time" );
	var time = Math.floor( audioPlayer.currentTime * 10 );
	currentTime.innerHTML = time / 10;

	// Set audio player time stamp
	audioPlayer.currentTime = ( percentage_complete / 100 ) * audioPlayer.duration;

}

function bla() {
	var audioPlayer = document.getElementById( "audio-player" );

	// Set current time
	var currentTime = document.getElementById( "current-time" );
	var time = Math.floor( audioPlayer.currentTime * 10 );
	currentTime.innerHTML = time / 10;

}
