<?php

/**
 * Handle ratings.
 *
 * @copyright Copyright (c), Ryan Hellyer
 * @license http://www.gnu.org/licenses/gpl.html GPL
 * @author Ryan Hellyer <ryanhellyer@gmail.com>
 * @package Arousing Audio
 * @since Arousing Audio 1.0
 */
class ArousingAudio_Ratings {

	/**
	 * Constructor.
	 */
	public function __construct() {

		add_action( 'wp_enqueue_scripts', array( $this, 'set_js_vars' ), 99 );
		add_action( 'template_redirect',  array( $this, 'process_rating' ) );
		add_action( 'add_meta_boxes',     array( $this, 'add_metabox' ) );

	}

	public function set_js_vars() {
		global $wp_query;

		$current_id = $wp_query->post->ID;

		wp_localize_script( 'arousing-audio-init', 'thumbs_up', (string) $this->get_ratings( 'up', "both", $current_id ) );
		wp_localize_script( 'arousing-audio-init', 'thumbs_down', (string) $this->get_ratings( 'down', "both", $current_id ) );

	}

	/**
	 * Add admin metabox.
	 */
	public function add_metabox() {
		add_meta_box(
			'ratings', // ID
			__( 'Ratings', 'arousingaudio' ), // Title
			array(
				$this,
				'meta_box', // Callback to method to display HTML
			),
			'audio', // Post type
			'side', // Context, choose between 'normal', 'advanced', or 'side'
			'high'  // Position, choose between 'high', 'core', 'default' or 'low'
		);
	}

	/**
	 * Output the meta box.
	 */
	public function meta_box() {

		echo '
		<p>
			Thumbs up logged out: ' . absint( $this->get_ratings( 'up', false ) ) . '
		</p>

		<p>
			Thumbs down logged out: ' . absint( $this->get_ratings( 'down', false ) ) . '
		</p>

		<p>
			Thumbs up logged in: ' . absint( $this->get_ratings( 'up', true ) ) . '
		</p>

		<p>
			Thumbs down logged in: ' . absint( $this->get_ratings( 'down', true ) ) . '
		</p>

		<input type="hidden" id="ratings-nonce" name="ratings-nonce" value="' . esc_attr( wp_create_nonce( __FILE__ ) ) . '">';

	}


	public function get_ratings( $direction, $_logged_in = false, $id ) {

		if ( 'up' == $direction ) {
			$value = 1;
		} else {
			$value = 0;
		}

		$ratings = array();
		if ( false == $_logged_in || "both" == $_logged_in ) {
			$ratings = get_post_meta( $id, '_ratings', true );
			if ( ! is_array( $ratings ) ) {
				$ratings = array();
			}
		}

		$ratings_logged_in = array();
		if ( true == $_logged_in || "both" == $_logged_in ) {
			$ratings_logged_in = get_post_meta( $id, '_ratings_logged_in', true );
			if ( ! is_array( $ratings_logged_in ) ) {
				$ratings_logged_in = array();
			}
		}

		$ratings_count = array_merge( $ratings, $ratings_logged_in );
		$rating_counts = array_count_values( $ratings_count );

		return $rating_counts[ $value ];
	}

	public function process_rating() {

		// Bail out now if rating not being set
		if ( ! isset( $_GET['rating-up'] ) && ! isset( $_GET['rating-down'] ) ) {
			return;
		}

		// Get rating
		if ( isset( $_GET['rating-up'] ) ) {
			$rating = 'up';
		} else if ( isset( $_GET['rating-down'] ) ) {
			$rating = 'down';
		}

		$id = absint( $_GET[ 'rating-' . $rating ] );

		// Bail out if not on audio post-type
		if ( 'audio' != get_post_type( $id ) ) {
			return;
		}

		if ( ! filter_var( $_SERVER[ 'REMOTE_ADDR' ], FILTER_VALIDATE_IP ) === false ) {
			$ip = $_SERVER[ 'REMOTE_ADDR' ];
		} else {
			echo 'Request rejected due to malformed IP address';
			die; // Bail out, because IP looks malicious
		}
$ip = $ip . '.' . rand( 0, 999 ); // Temporary IP for testing

		// Store logged in users at different location
		$logged_in = '';
		if ( is_user_logged_in() ) {
			$logged_in = '_logged_in';
		}

		if ( 'up' == $rating ) {
			$value = 1;
		} else {
			$value = 0;
		}

		$ratings = get_post_meta( $id, '_ratings' . $logged_in, true );
		if ( ! is_array( $ratings ) ) {
			$ratings = array();
		}

		$ratings[$ip] = $value;

		update_post_meta( $id, '_ratings_logged_in', $ratings );

		echo 'Rating successful!';
		die;
	}

}
