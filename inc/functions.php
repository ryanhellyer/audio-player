<?php

/**
 * Get audio posts as formatted array.
 *
 * @param   int    $current_post_id   The ID for the current page
 * @global  array  $audio_posts       An array of all audio post data. This data is kept in the array to be used as a cache for if function is reused.
 * @return  array  An array of all audio post data
 */
function arousingaudio_get_posts( $current_post_id = null ) {
	global $audio_posts;

	// If already set, then just spit it back out again (since it's been cached in the global)
	if ( isset( $audio_posts ) ) {
		return $audio_posts;
	}

	// Create query
	$audio_query = new WP_Query(
		array(
			'posts_per_page' => 100,
			'no_found_rows'  => true,
			'post_type'      => 'audio',
		)
	);

	// Loop through and generate the required array
	if ( $audio_query->have_posts() ) {
		$audio_posts = array();
		while ( $audio_query->have_posts() ) {
			$audio_query->the_post();

			$audio_file_id = get_post_meta( get_the_ID(), '_audio_file_id', true );
			$audio_file_meta = wp_get_attachment_metadata( $audio_file_id );
			$slug = get_post_field( 'post_name', get_post() );

			$audio_posts[ $slug ] = array(
				'id'             => get_the_ID(),
				'title'          => get_the_title(),
				'excerpt'        => get_the_excerpt(),
				'content'        => get_the_content(),

				// May not be needed, just dumping here in case they're useful later
				'length'         => (string) absint( $audio_file_meta[ 'length' ] ),
				'sample_rate'    => (string) absint( $audio_file_meta[ 'sample_rate' ] ),
				'audio_channels' => (string) absint( $audio_file_meta[ 'channels' ] ),
			);

			// Set if this is the current post
			if ( $current_post_id == get_the_ID() ) {
				$audio_posts[ $slug ][ 'current' ] = true;
			}

		}
	}

	return $audio_posts;
}
