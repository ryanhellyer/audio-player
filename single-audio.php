<?php
/**
 * The main template file.
 *
 * @package Arousing Audio
 * @since Arousing Audio 1.0
 */

get_header(); 

$id = $wp_query->post->ID;
$id =
$data = arousingaudio_get_post( $id );


echo '
<article>

	<h1 id="title">' . esc_html( $data[ 'title' ] ) . '</h1>

	<div id="content">' . $data[ 'content' ] . '</div>

	<!-- Audio visualiser -->
	<canvas id="canvas" width="800" height="350"></canvas>

	<div id="comments-wrapper">' . $data[ 'comments' ] . '</div>

<article>';


get_footer();

