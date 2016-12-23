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
				'content'        => wpautop( get_the_content() ),

				// May not be needed, just dumping here in case they're useful later
				'length'         => (string) absint( $audio_file_meta[ 'length' ] ),
				'sample_rate'    => (string) absint( $audio_file_meta[ 'sample_rate' ] ),
				'audio_channels' => (string) absint( $audio_file_meta[ 'channels' ] ),
			);

		}
	}

	return $audio_posts;
}


/**
 * Get audio posts as formatted array.
 *
 * @param   int     $id    The ID for the post
 * @return  array   The data required for building a particular post
 */
function arousingaudio_get_post( $id ) {

	$the_query = new WP_Query(
		array(
			'p'         => absint( $id ),
			'post_type' => array( 'audio' ),
		)
	);

	$all_audio = arousingaudio_get_posts( $id );

	$data = array();
	if ( $the_query->have_posts() ) {

		while ( $the_query->have_posts() ) {
			$the_query->the_post();

			// Get audio data - we access it from this function to ensure that JS data blob matches the data used here
			foreach ( $all_audio as $audio_slug => $audio_data ) {

				// Grab the current one only
				if ( $audio_data[ 'id' ] == get_the_ID() ) {
					$slug = $audio_slug;
					$audio = $audio_data;
				}
			}

			$data[ 'slug' ]    = sanitize_title( $slug );
			$data[ 'title' ]   = esc_html( $audio[ 'title'] );
			$data[ 'content' ] = $audio[ 'content'];
			$data[ 'audio' ]   = true;

			// Get comments section as a big HTML string
			ob_start();
			global $withcomments;
			$withcomments = 1;
			if ( comments_open() || '0' != get_comments_number() ) {
				comments_template( '', true );
			}
			$comments = ob_get_contents();
			ob_end_clean();

			$data[ 'comments' ] = $comments;


	    }
	}

	return $data;
}
