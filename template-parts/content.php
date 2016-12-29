		<h1 id="title"><?php echo esc_html( $data[ 'title' ] ); ?></h1>

		<div id="content"><?php echo $content; ?></div>

		<!-- Audio visualiser -->
		<canvas id="canvas" width="800" height="350"></canvas>

		<!-- Wrapper for comments -->
		<div id="comments"><?php echo $data[ 'comments' ]; ?></div>
