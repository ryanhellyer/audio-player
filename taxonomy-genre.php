<?php
/**
 * The main template file.
 *
 * @package Arousing Audio
 * @since Arousing Audio 1.0
 */

// Generate main page content string
$content = '
		<ul id="documents">';

foreach ( arousingaudio_get_posts() as $slug => $post ) {
	$content .= '
			<li>
				<a href="' . esc_url( get_permalink( $post[ 'id' ] ) ) . '">
					<strong>' . esc_html( $post[ 'title' ] ) . '</strong>
					' . esc_html( $post[ 'excerpt' ] ) . '
				</a>
			</li>';

}

$content .= '
		</ul>
';

// AJAX page
if ( isset( $_GET[ 'json' ] ) ) {

	$data = array();
	$data[ 'title' ]   = get_bloginfo( 'title' );
	$data[ 'content' ] = $content;

	echo json_encode( $data );
	die;
}


get_header();

echo '
	<h1 id="title">' . esc_html( get_bloginfo( 'name' ) ) . '</h1>

	<div id="content">' . $content . '</div>

	<!-- Audio visualiser -->
	<canvas id="canvas" width="800" height="350"></canvas>

	<!-- Wrapper for comments -->
	<div id="comments">' . $data[ 'comments' ] . '</div>

';

get_footer();
