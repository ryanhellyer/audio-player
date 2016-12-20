<?php
/**
 * The Header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="main">
 *
 * @package Arousing Audio
 * @since Arousing Audio 1.0
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<meta name="viewport" content="width=device-width" />
<link rel="profile" href="http://gmpg.org/xfn/11" />
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>

<a class="skip-link screen-reader-text" href="#main"><?php esc_html_e( 'Skip to content', 'arousingaudio' ); ?></a>

<header>

	<!-- Hamburger menu -->
	<div id="hamburger" class="hamburger"></div>
	<div id="hamburger-menu">
		<div class="hamburger"></div>

		<div class="logo"><?php

		// Output header text (need fallback to keep WordPress.org them demo happy)
		$header_text = get_option( 'header-text' );
		if ( $header_text ) {
			echo ArousingAudio_Setup::sanitize( $header_text );
		} else {
			echo 'Hellish<span>Simplicity</span><small>.tld</small>';
		}

		?></div>

		<ul>
			<li class="active" id="home">
				<a href="#home">Home</a>
			</li>
			<li id="upload">
				<a href="#">Upload audio</a>
			</li>
			<li id="record">
				<a href="#">Record audio</a>
			</li>
			<li id="login">
				<a href="#">Log in</a>
			</li>
			<li id="register">
				<a href="#">Register</a>
			</li>
			<li id="about">
				<a href="#">About</a>
			</li>
			<li id="contact">
				<a href="#">Contact</a>
			</li>
			<li id="legal-notice">
				<a href="#">Legal notice</a>
			</li>
		</ul>

	</div>

	<a href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" rel="home">
		<h1 class="logo"><?php

		// Output header text (need fallback to keep WordPress.org them demo happy)
		$header_text = get_option( 'header-text' );
		if ( $header_text ) {
			echo ArousingAudio_Setup::sanitize( $header_text );
		} else {
			echo 'Hellish<span>Simplicity</span><small>.tld</small>';
		}

		?></h1>
	</a>

	<nav>
		<form>

			<button value="Turnip" name="genre" />Turnip</button>
			<button value="Beetroot" name="genre" />Beetroot</button>
			<button class="active" value="Corn" name="genre" />Corn</button>
			<button value="Celery" name="genre" />Celery</button>
			<button value="Chickweed" name="genre" />Chickweed</button>

			<div class="select-box">
				<label>Duration </label>
				<select>
					<option>All durations</option>
					<option>&lt; 0:30</option>
					<option>0:30 - 1:00</option>
					<option>1:00 - 1:30</option>
					<option>1:30 - 2:00</option>
					<option>2:00 - 2:30</option>
					<option>2:30 - 3:00</option>
					<option>3:00 - 3:30</option>
					<option>3:30 - 4:00</option>
					<option>4:00 - 4:30</option>
					<option>4:30 - 5:00</option>
					<option>&gt; 5:00</option>
				</select>
			</div>

			<div class="select-box">
				<label>Orderby</label>
				<select>
					<option>Highest rated</option>
					<option>Most popular</option>
				</select>
			</div>

		</form>
	</nav>

</header>

<div class="wrapper" id="main">
