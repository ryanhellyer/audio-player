/**
 * Setting globals for use across all scripts.
 * These are set as globals to avoid rebuilding them continuously.
 */
var audioPlayer     = document.getElementById( "audio-player" );
var volumeValue     = document.getElementById("volume-value");
var durationTime    = document.getElementById( "duration-time" );
var currentTime     = document.getElementById( "current-time" );
var timeControl     = document.getElementById( "time-stamp" );
var mute            = document.getElementById( "mute" );
var volumeControl   = document.getElementById("volume-control");
var timeElapsedLine = document.getElementById( "time-elapsed-line" );
