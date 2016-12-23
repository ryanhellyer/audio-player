<?php
/**
 * The main template file.
 *
 * @package Arousing Audio
 * @since Arousing Audio 1.0
 */

$id = $wp_query->post->ID;
$data = arousingaudio_get_post( $id );

// AJAX page
if ( isset( $_GET[ 'json' ] ) ) {

	echo json_encode( $data );
	die;
}

get_header(); 


echo '

	<h1 id="title">' . esc_html( $data[ 'title' ] ) . '</h1>

	<div id="content">' . $data[ 'content' ] . '</div>

	<!-- Audio visualiser -->
	<canvas id="canvas" width="800" height="350"></canvas>

	<!-- Wrapper for comments -->
	<div id="comments">' . $data[ 'comments' ] . '</div>

';


get_footer();
