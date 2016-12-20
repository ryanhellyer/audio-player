<?php
/**
 * The main template file.
 *
 * @package Arousing Audio
 * @since Arousing Audio 1.0
 */

get_header(); 


// Get audio data - we access it from this function to ensure that JS data blob matches the data used here
$all_audio = arousingaudio_get_posts( get_the_ID() );
foreach ( $all_audio as $audio_slug => $audio_data ) {

	// Grab the current one only
	if ( $audio_data[ 'id' ] == get_the_ID() ) {
		$slug = $audio_slug;
		$audio = $audio_data;
	}
}


// Start of the Loop
while ( have_posts() ) {
	the_post();

	?>
<!-- Individual audio file page content -->
<article>
	<h1><?php echo esc_html( $audio[ 'title'] ); ?></h1>
	<?php echo wpautop( $audio[ 'content' ] );

	// If comments are open or we have at least one comment, load up the comment template
	if ( comments_open() || '0' != get_comments_number() ) {
		comments_template( '', true );
	}

}


get_footer();
