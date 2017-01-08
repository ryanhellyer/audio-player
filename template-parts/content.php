
		<div id="content-wrapper">
			<div id="content-wrapper-inner">
<!--
				<img src="https://images.unsplash.com/photo-1416615267350-a82c5a347dbf?dpr=1&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=" />
-->
				<h1 id="title"><?php echo esc_html( $data[ 'title' ] ); ?></h1>

				<div id="content"><?php echo $data[ 'content' ]; ?></div>

				<!-- Audio visualiser -->
				<canvas id="canvas" height="350"></canvas>

			</div>
		</div>

		<!-- Wrapper for comments -->
		<div id="comments"><?php echo $data[ 'comments' ]; ?></div>
