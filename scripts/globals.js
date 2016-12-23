/**
 * Setting globals for use across all scripts.
 * These are set as globals to avoid rebuilding them continuously.
 */
var audioFileDir     = window.location.origin + "/audio/";

// Audio player
var audioPlayer      = document.getElementById( "audio-player" );
var volumeValue      = document.getElementById("volume-value");
var durationTime     = document.getElementById( "duration-time" );
var currentTime      = document.getElementById( "current-time" );
var timeControl      = document.getElementById( "time-stamp" );
var mute             = document.getElementById( "mute" );
var volumeControl    = document.getElementById( "volume-control");
var timeElapsedLine  = document.getElementById( "time-elapsed-line" );
var repeatButton     = document.getElementById( "repeat-button" );
var trackDescription = document.getElementById( "track-description" );

// Menu
var hamburgerMenu    = document.getElementById( "hamburger-menu" );


// Main content
var main             = document.getElementById( "main" );
var title            = document.getElementById( "title" );
var content          = document.getElementById( "content" );
var canvas           = document.getElementById( "canvas" );
var comments         = document.getElementById( "comments" );
