<?php
/**
 * The main template file.
 *
 * @package Arousing Audio
 * @since Arousing Audio 1.0
 */

// Generate main page content string
$content = '
			<table>
				<tr>
					<th> </th>
					<th>' . __( 'Genre', 'arousingaudio' ) . '</th>
					<th>' . __( 'Duration', 'arousingaudio' ) . '</th>
					<th>' . __( 'Rating', 'arousingaudio' ) . '</th>
				</tr>';

$continue = true;
foreach ( arousingaudio_get_posts() as $key => $post ) {
	$slug = $post[ 'slug' ];

	// Filter based on taxonomy
	if ( is_tax( 'genre' ) ) {
		$term_slug = get_queried_object()->slug;

		$continue = false;
		foreach ( $post[ 'genre-terms' ] as $key => $term ) {
			if ( $term_slug == $term[ 'slug'] ) {
				$continue = true;
			}
		}

	}

	// Filter out unwanted results
	if ( true == $continue ) {

		// Convert duration to human readable format
		$duration_in_seconds = $post[ 'length' ];
		$duration_whole_minutes = floor( $duration_in_seconds / 60 );
		$duration_left_seconds = $duration_in_seconds - ( $duration_whole_minutes * 60 );
		$duration = $duration_whole_minutes . ':' .$duration_left_seconds;

		// Create term list
		$terms = '';
		foreach ( $post[ 'genre-terms' ] as $key => $term ) {

			if ( '' != $terms ) {
				$terms .= ', ';
			}

$term['name'] =  substr( md5( $term['name'] ) ,0,rand(4, 10 ) );

			$terms .= '<a href="' . esc_url( home_url() . '/genre/' . $term[ 'slug' ] ) . '/">' . esc_html( $term[ 'name' ] ) . '</a>';

		}

		$content .= '
				<tr data-href="' . esc_url( get_permalink( $post[ 'id' ] ) ) . '">
					<td>
						<a href="' . esc_url( get_permalink( $post[ 'id' ] ) ) . '">
							<strong>' . esc_html( $post[ 'title' ] ) . '</strong>
							' . esc_html( $post[ 'excerpt' ] ) . '
						</a>
					</td>
					<td>
						' . $terms . '
					</td>
					<td>
						' . esc_html( $duration ) . '
					</td>
					<td>
						<span class="thumbs-up"></span>
						' . esc_html( $post[ 'thumbs_up' ] ) . '
						 &nbsp; 
						<span class="thumbs-down"></span>
						' . esc_html( $post[ 'thumbs_down' ] ) . '
					</td>
				</tr>';
		}

}

$content .= '
			</table>
		';

$data = array();
$data[ 'title' ]   = get_bloginfo( 'title' );
$data[ 'content' ] = $content;

// AJAX page
if ( isset( $_GET[ 'json' ] ) ) {

	echo json_encode( $data );
	die;
}


get_header(); 

require( 'template-parts/content.php' );

get_footer();
